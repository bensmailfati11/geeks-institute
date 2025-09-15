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

