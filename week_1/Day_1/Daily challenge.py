# challenge_1_multiples.py

# Demande à l'utilisateur un nombre et une longueur
number = int(input("Entrez un nombre : "))
length = int(input("Entrez la longueur souhaitée de la liste : "))

# Génère la liste des multiples
multiples = [number * i for i in range(1, length + 1)]

# Affiche le résultat
print("Liste des multiples :", multiples)
