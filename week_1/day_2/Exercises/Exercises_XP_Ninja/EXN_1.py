# Initial string
cars_str = "Volkswagen, Toyota, Ford Motor, Honda, Chevrolet"

# Convertir en liste
cars_list = [car.strip() for car in cars_str.split(",")]
print("Liste originale :", cars_list)

# 1. Nombre de fabricants
print(f"Il y a {len(cars_list)} fabricants dans la liste.")

# 2. Liste en ordre décroissant (Z-A)
print("Fabricants (Z-A) :", sorted(cars_list, reverse=True))

# 3. Noms contenant la lettre 'o'
with_o = [car for car in cars_list if 'o' in car.lower()]
print(f"Fabricants avec la lettre 'o' : {len(with_o)} -> {with_o}")

# 4. Noms sans la lettre 'i'
without_i = [car for car in cars_list if 'i' not in car.lower()]
print(f"Fabricants sans la lettre 'i' : {len(without_i)} -> {without_i}")

# BONUS : suppression des doublons
cars_list_with_dupes = ["Honda", "Volkswagen", "Toyota", "Ford Motor", "Honda", "Chevrolet", "Toyota"]

unique_cars = list(set(cars_list_with_dupes))
print(f"Fabricants sans doublons ({len(unique_cars)}): {', '.join(unique_cars)}")

# BONUS 2 : ordre croissant (A-Z) mais inverser les lettres
reversed_names = [car[::-1] for car in sorted(unique_cars)]
print("Fabricants A-Z mais inversés :", reversed_names)
