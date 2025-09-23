import random

# Exercise 1: What is the Season?
month = int(input("Enter a month number (1-12): "))

if 3 <= month <= 5:
    print("It's Spring 🌸")
elif 6 <= month <= 8:
    print("It's Summer ☀️")
elif 9 <= month <= 11:
    print("It's Autumn 🍂")
elif month == 12 or month <= 2:
    print("It's Winter ❄️")
else:
    print("Invalid month!")

# ------------------------------------------------------

# Exercise 2: For Loop
print("\nNumbers from 1 to 20:")
for i in range(1, 21):
    print(i, end=' ')
print("\n\nNumbers with even indices (0-based indexing):")
for i in range(1, 21):
    if i % 2 == 0:  # index is even
        print(i, end=' ')

# ------------------------------------------------------

# Exercise 3: While Loop
my_name = "Fatima"
user_name = ""
while user_name != my_name:
    user_name = input("\nEnter your name: ")
print("You entered my name! 🎉")

# ------------------------------------------------------

# Exercise 4: Check the index
names = ['Samus', 'Cortana', 'V', 'Link', 'Mario', 'Cortana', 'Samus']
search_name = input("\nEnter a name to search: ")
if search_name in names:
    print(f"The first occurrence of {search_name} is at index {names.index(search_name)}")
else:
    print(f"{search_name} is not in the list.")

# ------------------------------------------------------

# Exercise 5: Greatest Number
num1 = float(input("\nEnter the 1st number: "))
num2 = float(input("Enter the 2nd number: "))
num3 = float(input("Enter the 3rd number: "))
greatest = max(num1, num2, num3)
print(f"The greatest number is: {greatest}")

# ------------------------------------------------------

# Exercise 6: Random number guessing game
wins = 0
losses = 0
play_again = "yes"

while play_again.lower() in ["yes", "y"]:
    user_guess = int(input("\nGuess a number from 1 to 9: "))
    rand_number = random.randint(1, 9)
    print(f"The number was: {rand_number}")
    
    if user_guess == rand_number:
        print("Winner! 🎉")
        wins += 1
    else:
        print("Better luck next time. 😅")
        losses += 1
    
    play_again = input("Do you want to play again? (yes/no): ")

print(f"\nGames won: {wins}")
print(f"Games lost: {losses}")
