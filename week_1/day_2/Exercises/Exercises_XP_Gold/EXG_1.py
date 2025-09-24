# Exercise 1: Birthday Look-up

# 1. Créer un dictionnaire avec 5 anniversaires
birthdays = {
    "Alice": "1995/03/12",
    "Bob": "1990/07/25",
    "Charlie": "2001/11/05",
    "Diana": "1998/01/30",
    "Ethan": "1993/09/17"
}

# 2. Message de bienvenue
print("Welcome to the Birthday Look-up program! 🎉")
print("You can look up the birthdays of the people in the list!")

# 3. Demander un nom à l’utilisateur
name = input("Enter a name to look up their birthday: ")

# 4. Vérifier si le nom existe dans le dictionnaire
if name in birthdays:
    print(f"{name}'s birthday is on {birthdays[name]}.")
else:
    print(f"Sorry, I don’t have the birthday information for {name}.")
