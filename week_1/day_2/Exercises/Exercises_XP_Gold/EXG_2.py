# Exercise 2: Birthdays Advanced

print("Here are the people you can look up:")
for person in birthdays.keys():
    print("-", person)

name = input("\nWhose birthday do you want to look up? ")

if name in birthdays:
    print(f"{name}'s birthday is on {birthdays[name]}")
else:
    print(f"Sorry, we don’t have the birthday information for {name}.")
