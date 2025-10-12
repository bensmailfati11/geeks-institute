#!/usr/bin/env python3
import sqlite3
import hashlib
import os
import secrets

class SecureAuthenticationDB:
    def __init__(self, db_name="secure_users.db"):
        self.db_name = db_name
        self.init_database()
    
    def init_database(self):
        """Initialize the database and create users table if it doesn't exist"""
        conn = sqlite3.connect(self.db_name)
        cursor = conn.cursor()
        
        # Create users table with salt for password security
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,
                password_hash TEXT NOT NULL,
                salt TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        # Insert initial users if table is empty
        cursor.execute("SELECT COUNT(*) FROM users")
        count = cursor.fetchone()[0]
        
        if count == 0:
            initial_users = [
                ("alice", "password123"),
                ("bob", "mypassword"),
                ("charlie", "secret456")
            ]
            
            for username, password in initial_users:
                salt = self.generate_salt()
                password_hash = self.hash_password(password, salt)
                cursor.execute("INSERT INTO users (username, password_hash, salt) VALUES (?, ?, ?)", 
                              (username, password_hash, salt))
            
            print("Database initialized with 3 default users (passwords encrypted).")
        
        conn.commit()
        conn.close()
    
    def generate_salt(self):
        """Generate a random salt for password hashing"""
        return secrets.token_hex(16)
    
    def hash_password(self, password, salt):
        """Hash password with salt using SHA-256"""
        # Combine password and salt
        salted_password = password + salt
        # Create SHA-256 hash
        password_hash = hashlib.sha256(salted_password.encode('utf-8')).hexdigest()
        return password_hash
    
    def user_exists(self, username):
        """Check if a username exists in the database"""
        conn = sqlite3.connect(self.db_name)
        cursor = conn.cursor()
        
        cursor.execute("SELECT COUNT(*) FROM users WHERE username = ?", (username,))
        exists = cursor.fetchone()[0] > 0
        
        conn.close()
        return exists
    
    def validate_user(self, username, password):
        """Validate user credentials with encrypted password"""
        conn = sqlite3.connect(self.db_name)
        cursor = conn.cursor()
        
        # Get stored hash and salt for the user
        cursor.execute("SELECT password_hash, salt FROM users WHERE username = ?", (username,))
        result = cursor.fetchone()
        
        conn.close()
        
        if result:
            stored_hash, salt = result
            # Hash the provided password with the stored salt
            password_hash = self.hash_password(password, salt)
            # Compare hashes
            return password_hash == stored_hash
        
        return False
    
    def add_user(self, username, password):
        """Add a new user to the database with encrypted password"""
        try:
            conn = sqlite3.connect(self.db_name)
            cursor = conn.cursor()
            
            # Generate salt and hash password
            salt = self.generate_salt()
            password_hash = self.hash_password(password, salt)
            
            cursor.execute("INSERT INTO users (username, password_hash, salt) VALUES (?, ?, ?)", 
                          (username, password_hash, salt))
            conn.commit()
            conn.close()
            return True
        except sqlite3.IntegrityError:
            # Username already exists
            conn.close()
            return False
    
    def get_all_users(self):
        """Get all usernames (for debugging/admin purposes)"""
        conn = sqlite3.connect(self.db_name)
        cursor = conn.cursor()
        
        cursor.execute("SELECT username, created_at FROM users")
        users = cursor.fetchall()
        
        conn.close()
        return users
    
    def show_password_info(self, username):
        """Show password hash info for debugging (admin only)"""
        conn = sqlite3.connect(self.db_name)
        cursor = conn.cursor()
        
        cursor.execute("SELECT password_hash, salt FROM users WHERE username = ?", (username,))
        result = cursor.fetchone()
        
        conn.close()
        return result

def main():
    # Initialize secure database
    db = SecureAuthenticationDB()
    logged_in = None  # Variable to track logged in user
    
    print("Welcome to the Secure Authentication System!")
    print("🔒 All passwords are encrypted using SHA-256 with salt")
    print("Commands: 'login' to log in, 'signup' to create account, 'list' to show users, 'exit' to quit")
    print("Default users: alice (password123), bob (mypassword), charlie (secret456)")
    
    while True:
        command = input("\nEnter command: ").strip().lower()
        
        if command == "exit":
            print("Goodbye!")
            break
        
        elif command == "login":
            username = input("Enter username: ").strip()
            password = input("Enter password: ").strip()
            
            # Validate user credentials using encrypted password
            if db.validate_user(username, password):
                print("✅ You are now logged in")
                logged_in = username
                print(f"Logged in as: {logged_in}")
            else:
                print("❌ Invalid username or password")
                # Ask if they would like to sign up
                signup_choice = input("User does not exist or wrong password. Would you like to sign up? (y/n): ").strip().lower()
                if signup_choice == 'y' or signup_choice == 'yes':
                    signup_user(db)
        
        elif command == "signup":
            signup_user(db)
        
        elif command == "list":
            # Debug command to show all users
            users = db.get_all_users()
            print("\n--- All Users ---")
            for username, created_at in users:
                print(f"Username: {username}, Created: {created_at}")
        
        elif command == "debug" and logged_in:
            # Debug command to show password hash (for educational purposes)
            result = db.show_password_info(logged_in)
            if result:
                hash_value, salt = result
                print(f"\n--- Debug Info for {logged_in} ---")
                print(f"Password Hash: {hash_value[:20]}... (truncated)")
                print(f"Salt: {salt}")
        
        else:
            print("Unknown command. Use 'login', 'signup', 'list', or 'exit'")

def signup_user(db):
    """Handle user signup process with secure database"""
    print("\n--- Sign Up ---")
    
    # Ask for username and validate it doesn't exist
    while True:
        username = input("Enter a username: ").strip()
        
        if username == "":
            print("Username cannot be empty. Please try again.")
            continue
        
        if db.user_exists(username):
            print("Username already exists. Please choose a different username.")
            continue
        
        # Username is valid
        break
    
    # Ask for password
    password = input("Enter a password: ").strip()
    
    if len(password) < 6:
        print("⚠️  Warning: Password is less than 6 characters. Consider using a stronger password.")
    
    # Add user to database with encryption
    if db.add_user(username, password):
        print(f"✅ Account created successfully! Welcome, {username}!")
        print("🔒 Your password has been securely encrypted and stored.")
    else:
        print("❌ Error creating account. Please try again.")

if __name__ == "__main__":
    main()