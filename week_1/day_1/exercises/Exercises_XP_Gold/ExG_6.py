""" Exercise 6: Random number """

import random

# Initialize counters for wins and losses
games_won = 0
games_lost = 0

print("Welcome to the Guessing Game!/kl")
print("Try to guess the number between 1 and 9.")

while True:
    # Ask the user for input
    user_input = input("Enter a number from 1 to 9 (or 'q' to quit): ")
    
    if user_input.lower() == 'q':
        break  # exit the loop if the user wants to quit
    
    # Convert input to integer
    try:
        user_guess = int(user_input)
        if user_guess < 1 or user_guess > 9:
            print("Please enter a number between 1 and 9.")
            continue
    except ValueError:
        print("Invalid input! Please enter a number from 1 to 9.")
        continue

# Generate random number
random_number = random.randint(1, 9)
print(f"Random number is: {random_number}")

# Check the guess
if user_guess == random_number:
    print("Winner!")
    games_won += 1
else:
    print("Better luck next time.")
    games_lost += 1

# Display total games won and lost
print("\nGame Over!")
print(f"Total games won: {games_won}")
print(f"Total games lost: {games_lost}")