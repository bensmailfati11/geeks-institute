#!/usr/bin/env python3
"""
Exercise 1: Authentication database - Part 3
Authentication CLI with Database integration using SQLite
"""

import sqlite3
import os

class AuthenticationDB:
    def __init__(self, db_name="users.db"):
        self.db_name = db_name
        self.init_database()
    
    def init_database(self):
        """Initialize the database and create users table if it doesn't exist"""
        conn = sqlite3.connect(self.db_name)
        cursor = conn.cursor()
        
        # Create users table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
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
            cursor.executemany("INSERT INTO users (username, password) VALUES (?, ?)", initial_users)
            print("Database initialized with 3 default users.")
        
        conn.commit()
        conn.close()
    
    def user_exists(self, username):
        """Check if a username exists in the database"""
        conn = sqlite3.connect(self.db_name)
        cursor = conn.cursor()
        
        cursor.execute("SELECT COUNT(*) FROM users WHERE username = ?", (username,))
        exists = cursor.fetchone()[0] > 0
        
        conn.close()
        return exists
    
    def validate_user(self, username, password):
        """Validate user credentials"""
        conn = sqlite3.connect(self.db_name)
        cursor = conn.cursor()
        
        cursor.execute("SELECT COUNT(*) FROM users WHERE username = ? AND password = ?", 
                      (username, password))
        valid = cursor.fetchone()[0] > 0
        
        conn.close()
        return valid
    
    def add_user(self, username, password):
        """Add a new user to the database"""
        try:
            conn = sqlite3.connect(self.db_name)
            cursor = conn.cursor()
            
            cursor.execute("INSERT INTO users (username, password) VALUES (?, ?)", 
                          (username, password))
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

def main():
    # Initialize database
    db = AuthenticationDB()
    logged_in = None  # Variable to track logged in user
    
    print("Welcome to the Authentication System with Database!")
    print("Commands: 'login' to log in, 'signup' to create account, 'list' to show users, 'exit' to quit")
    
    while True:
        command = input("\nEnter command: ").strip().lower()
        
        if command == "exit":
            print("Goodbye!")
            break
        
        elif command == "login":
            username = input("Enter username: ").strip()
            password = input("Enter password: ").strip()
            
            # Validate user credentials using database
            if db.validate_user(username, password):
                print("You are now logged in")
                logged_in = username
                print(f"Logged in as: {logged_in}")
            else:
                print("Invalid username or password")
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
        
        else:
            print("Unknown command. Use 'login', 'signup', 'list', or 'exit'")

def signup_user(db):
    """Handle user signup process with database"""
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
    
    # Add user to database
    if db.add_user(username, password):
        print(f"Account created successfully! Welcome, {username}!")
    else:
        print("Error creating account. Please try again.")

if __name__ == "__main__":
    main()