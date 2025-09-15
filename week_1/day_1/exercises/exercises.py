""" Exercise 1 : Hello World """

#print("Hello world \n"*4)


""" Exercise 2 : Some Math """

# calcul de (99³) × 8
result = (99 ** 3) * 8

print("The result of (99^3) × 8 is:", result)


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


""" Exercise 4 : Tall enough to ride a roller coaster """

# Demander la taille en centimètres
height = int(input("Enter your height in cm: "))

# Vérifier la condition
if height >= 145:
    print("Yay! You are tall enough to ride the roller coaster!")
else:
    print("Sorry, you need to grow a bit more before you can ride.")


""" Exercise 5 : Favorite Numbers """

# 1. Créer un set avec mes nombres favoris
my_fav_numbers = {3, 7, 15}
print("My favorite numbers:", my_fav_numbers)

# 2. Ajouter deux nouveaux nombres
my_fav_numbers.add(42)
my_fav_numbers.add(99)
print("After adding two numbers:", my_fav_numbers)

# 3. Supprimer un nombre (pop enlève un élément "au hasard")
my_fav_numbers.pop()
print("After removing one number:", my_fav_numbers)

# 4. Créer le set d’un ami
friend_fav_numbers = {8, 15, 23}
print("Friend's favorite numbers:", friend_fav_numbers)

# 5. Fusionner les deux sets
our_fav_numbers = my_fav_numbers.union(friend_fav_numbers)
print("Our favorite numbers:", our_fav_numbers)

""" Exercise 6 : Tuple """

# Un tuple d'entiers
numbers = (1, 2, 3)
print("Original tuple:", numbers)

numbers = numbers + (4, 5)
print("New tuple:", numbers)

""" Exercise 7 : List """

# Liste donnée
basket = ["Banana", "Apples", "Oranges", "Blueberries"]
print("Original basket:", basket)

# 1. Enlever Banana
basket.remove("Banana")
print("After removing Banana:", basket)

# 2. Enlever Blueberries
basket.remove("Blueberries")
print("After removing Blueberries:", basket)

# 3. Ajouter Kiwi à la fin
basket.append("Kiwi")
print("After adding Kiwi:", basket)

# 4. Ajouter Apples au début
basket.insert(0, "Apples")
print("After adding Apples at the beginning:", basket)

# 5. Compter combien de fois "Apples" apparaît
apple_count = basket.count("Apples")
print("Number of Apples:", apple_count)

# 6. Vider la liste
basket.clear()
print("Basket after clearing:", basket)

""" Exercise 8 : Sandwich Orders """

sandwich_orders = [
    "Tuna sandwich", 
    "Pastrami sandwich", 
    "Avocado sandwich", 
    "Pastrami sandwich", 
    "Egg sandwich", 
    "Chicken sandwich", 
    "Pastrami sandwich"
]

print("Original orders:", sandwich_orders)

# 1. Le deli n’a plus de pastrami → enlever toutes les occurrences
print("\nSorry, the deli has run out of pastrami.")
while "Pastrami sandwich" in sandwich_orders:
    sandwich_orders.remove("Pastrami sandwich")

print("Orders after removing pastrami:", sandwich_orders)

# 2. Créer une liste vide pour les sandwiches préparés
finished_sandwiches = []

# 3. Déplacer un par un de sandwich_orders vers finished_sandwiches
while sandwich_orders:
    current_sandwich = sandwich_orders.pop(0)  # prendre le premier
    print(f"I’m preparing your {current_sandwich.lower()}...")
    finished_sandwiches.append(current_sandwich)

# 4. Afficher les sandwiches préparés
print("\nAll sandwiches are ready:")
for sandwich in finished_sandwiches:
    print(f"I made your {sandwich.lower()}")
