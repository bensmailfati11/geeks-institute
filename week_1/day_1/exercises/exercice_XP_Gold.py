""" Exercise 1: What is the Season? """
# Ask the user to enter a month (1 to 12)
month = int(input("Enter the month number (1-12): "))

# Determine the season
if month in [3, 4, 5]:
    season = "Spring"
elif month in [6, 7, 8]:
    season = "Summer"
elif month in [9, 10, 11]:
    season = "Autumn"
elif month in [12, 1, 2]:
    season = "Winter"
else:
    season = "Invalid month number!"

# Display the result
print("The season is:", season)

""" Exercise 2: For Loop """

# Part 1: Print all numbers from 1 to 20
print("All numbers from 1 to 20:")
for number in range(1, 21):  # range(1, 21) goes from 1 to 20
    print(number, end=" ")
print("\n")  # newline for separation

# Part 2: Print numbers with even index (0, 2, 4, ...)
print("Numbers with even index (starting from index 0):")
numbers = list(range(1, 21))  # create a list from 1 to 20
for index in range(len(numbers)):
    if index % 2 == 0:  # check if index is even
        print(numbers[index], end=" ")


""" Exercise 3: While Loop """

# Replace 'YourName' with your actual name
my_name = "Meriem"

user_name = ""  # initialize variable

# Keep asking until the user enters the correct name
while user_name != my_name:
    user_name = input("Enter your name: ")

print(f"Welcome, {my_name}!")


""" Exercise 4: Check the index """

# List of names
names = ['Samus', 'Cortana', 'V', 'Link', 'Mario', 'Cortana', 'Samus']

# Ask the user for a name
user_name = input("Enter a name: ")

# Check if the name is in the list
if user_name in names:
    first_index = names.index(user_name)  # get the index of the first occurrence
    print(f"The first occurrence of {user_name} is at index {first_index}.")
else:
    print(f"{user_name} is not in the list.")


""" Exercise 5: Greatest Number """

# Ask the user for 3 numbers
num1 = float(input("Input the 1st number: "))
num2 = float(input("Input the 2nd number: "))
num3 = float(input("Input the 3rd number: "))

# Determine the greatest number
greatest = num1  # assume num1 is greatest initially

if num2 > greatest:
    greatest = num2
if num3 > greatest:
    greatest = num3

# Display the result
print("The greatest number is:", greatest)


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