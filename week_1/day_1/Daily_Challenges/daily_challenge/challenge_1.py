# Ask the user for input
number = int(input("Enter a number: "))
length = int(input("Enter the length: "))

# Generate multiples
multiples = [number * i for i in range(1, length + 1)]

# Print result
print(multiples)
