# Jeu du Morpion (Tic Tac Toe)

# 1. Plateau initial (liste de 9 cases vides)
plateau = [" "] * 9

# 2. Fonction pour afficher le plateau
def afficher_plateau():
    print()
    print(f"{plateau[0]} | {plateau[1]} | {plateau[2]}")
    print("--+---+--")
    print(f"{plateau[3]} | {plateau[4]} | {plateau[5]}")
    print("--+---+--")
    print(f"{plateau[6]} | {plateau[7]} | {plateau[8]}")
    print()

# 3. Fonction pour demander la position au joueur
def saisir_position(joueur):
    while True:
        try:
            pos = int(input(f"Joueur {joueur}, choisis une case (1-9) : ")) - 1
            if pos < 0 or pos > 8:
                print("Choisis un nombre entre 1 et 9.")
            elif plateau[pos] != " ":
                print("Cette case est déjà occupée, essaie encore.")
            else:
                plateau[pos] = joueur
                break
        except ValueError:
            print("Entre un nombre valide.")

# 4. Fonction pour vérifier la victoire
def verifier_victoire(joueur):
    combinaisons = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  # lignes
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  # colonnes
        [0, 4, 8], [2, 4, 6]              # diagonales
    ]
    for combo in combinaisons:
        if plateau[combo[0]] == plateau[combo[1]] == plateau[combo[2]] == joueur:
            return True
    return False

# 5. Fonction principale du jeu
def jouer():
    joueur_courant = "X"
    for tour in range(9):
        afficher_plateau()
        saisir_position(joueur_courant)

        if verifier_victoire(joueur_courant):
            afficher_plateau()
            print(f"Bravo, Joueur {joueur_courant} a gagné !")
            return

        # changer de joueur
        joueur_courant = "O" if joueur_courant == "X" else "X"

    afficher_plateau()
    print("🤝 Match nul !")

# Lancer le jeu
if __name__ == "__main__":
    jouer()
