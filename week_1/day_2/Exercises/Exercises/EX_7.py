import random

def get_random_temp(season):
    """
    Retourne une température aléatoire (float) en fonction de la saison.
    """
    if season == "winter":
        return round(random.uniform(-10, 16), 1)
    elif season == "spring":
        return round(random.uniform(5, 23), 1)
    elif season == "summer":
        return round(random.uniform(16, 40), 1)
    elif season == "autumn" or season == "fall":
        return round(random.uniform(0, 24), 1)
    else:
        # Valeurs par défaut si la saisie est incorrecte
        return round(random.uniform(-10, 40), 1)


def main():
    # --- Bonus : demander un mois au lieu d'une saison ---
    month = int(input("Entrez le numéro du mois (1 = Janvier, 12 = Décembre): "))

    if month in [12, 1, 2]:
        season = "winter"
    elif month in [3, 4, 5]:
        season = "spring"
    elif month in [6, 7, 8]:
        season = "summer"
    else:
        season = "autumn"

    temp = get_random_temp(season)
    print(f"\nLa température actuelle est de {temp}°C ({season}).")

    # Conseils selon la température
    if temp < 0:
        print("Brrr, il gèle ! Mets plusieurs couches de vêtements.")
    elif 0 <= temp <= 16:
        print("Il fait frais, n’oublie pas ton manteau.")
    elif 16 < temp <= 23:
        print("Température agréable, profite de ta journée.")
    elif 24 <= temp <= 32:
        print("Il fait chaud, pense à t’hydrater !")
    elif 32 < temp <= 40:
        print("Canicule ! Reste à l’ombre et bois beaucoup d’eau.")


# Lancer le programme
main()
