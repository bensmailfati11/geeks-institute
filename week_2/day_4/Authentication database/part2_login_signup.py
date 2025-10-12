#!/usr/bin/env python3
"""
Exercise 1: Authentication database - Part 2
Authentication CLI - Login and Signup functionality
"""

def main():
    # Initialize dictionary with 3 users & passwords
    users = {
        "alice": "password123",
        "bob": "mypassword",
        "charlie": "secret456"
    }
    
    logged_in = None  # Variable to track logged in user
    
    print("Welcome to the Authentication System!")
    print("Commands: 'login' to log in, 'signup' to create account, 'exit' to quit")
    
    while True:
        command = input("\nEnter command: ").strip().lower()
        
        if command == "exit":
            print("Goodbye!")
            break
        
        elif command == "login":
            username = input("Enter username: ").strip()
            password = input("Enter password: ").strip()
            
            # Check if user exists and password matches
            if username in users and users[username] == password:
                print("You are now logged in")
                logged_in = username
                print(f"Logged in as: {logged_in}")
            else:
                print("Invalid username or password")
                # Ask if they would like to sign up
                signup_choice = input("User does not exist. Would you like to sign up? (y/n): ").strip().lower()
                if signup_choice == 'y' or signup_choice == 'yes':
                    signup_user(users)
        
        elif command == "signup":
            signup_user(users)
        
        else:
            print("Unknown command. Use 'login', 'signup', or 'exit'")

def signup_user(users):
    """Handle user signup process"""
    print("\n--- Sign Up ---")
    
    # Ask for username and validate it doesn't exist
    while True:
        username = input("Enter a username: ").strip()
        
        if username == "":
            print("Username cannot be empty. Please try again.")
            continue
        
        if username in users:
            print("Username already exists. Please choose a different username.")
            continue
        
        # Username is valid
        break
    
    # Ask for password
    password = input("Enter a password: ").strip()
    
    # Add user to dictionary
    users[username] = password
    print(f"Account created successfully! Welcome, {username}!")

if __name__ == "__main__":
    main()