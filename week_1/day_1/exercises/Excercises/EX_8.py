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
