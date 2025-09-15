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
