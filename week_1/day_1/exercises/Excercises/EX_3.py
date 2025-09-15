""" Exercise 3 : What’s your name ? """

# On demande le nom à l'utilisateur
user_name = input("What's your name? ")

# On définit mon propre prénom
my_name = "meriem"

# On compare
if user_name.lower() == my_name.lower():
    print("Wow! We have the same name That's awesome!")
else:
    print(f"Oh, so your name is {user_name}? Nice! But mine is cooler")

