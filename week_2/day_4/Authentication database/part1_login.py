#!/usr/bin/env python3
"""
Exercise 1: Authentication database - Part 1
Authentication CLI - Login functionality
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
    print("Commands: 'login' to log in, 'exit' to quit")
    
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
        
        else:
            print("Unknown command. Use 'login' or 'exit'")

if __name__ == "__main__":
    main()