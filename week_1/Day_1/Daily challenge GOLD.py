# Exercise: Happy Birthday Cake (Basic Version)

# Ask the user for their birthdate
birthdate_str = input("Enter your birthdate (DD/MM/YYYY): ")

# Split the birthdate to get the year
day, month, year = birthdate_str.split("/")
year = int(year)

# Calculate age (basic)
current_year = 2025  # you can also use datetime.today().year
age = current_year - year

# Determine number of candles (last digit of age)
num_candles = age % 10

# Print a simple cake
print("\nHere is your cake:\n")
print("       ___" + "i"*num_candles + "___")
print("      |:H:a:p:p:y:|")
print("    __|___________|__")
print("   |^^^^^^^^^^^^^^^^^|")
print("   |:B:i:r:t:h:d:a:y:|")
print("   |                 |")
print("   ~~~~~~~~~~~~~~~~~~~")

# Bonus: Check for leap year and print two cakes
if (year % 4 == 0 and (year % 100 != 0 or year % 400 == 0)):
    print("\nYou were born in a leap year! Double cake! 🎉🎉")
    print("       ___" + "i"*num_candles + "___")
    print("      |:H:a:p:p:y:|")
    print("    __|___________|__")
    print("   |^^^^^^^^^^^^^^^^^|")
    print("   |:B:i:r:t:h:d:a:y:|")
    print("   |                 |")
    print("   ~~~~~~~~~~~~~~~~~~~")

print(f"\nHappy Birthday! You are {age} years old!")
