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
