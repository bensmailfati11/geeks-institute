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
