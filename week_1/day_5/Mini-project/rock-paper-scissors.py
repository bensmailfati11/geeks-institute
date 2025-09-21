from game import Game   # on importe la classe Game créée dans game.py

def get_user_menu_choice():
    print("\n--- Rock Paper Scissors Menu ---")
    print("1: Play a new game")
    print("2: Show scores")
    print("x: Quit")

    choice = input("Enter your choice: ").lower().strip()
    
    # Pas de boucle ici, juste validation simple
    if choice in ["1", "2", "x", "q"]:
        return choice
    else:
        print("Invalid choice. Please select 1, 2, or x.")
        return None


def print_results(results):
    print("\n--- Game Results ---")
    print(f"Wins:  {results['win']}")
    print(f"Losses:{results['loss']}")
    print(f"Draws: {results['draw']}")
    print("Thanks for playing! Goodbye.")


def main():
    results = {"win": 0, "loss": 0, "draw": 0}  # dictionnaire des scores
    
    while True:
        choice = get_user_menu_choice()
        
        if choice == "1":  # Jouer une partie
            game = Game()
            result = game.play()  # retourne "win" / "loss" / "draw"
            results[result] += 1   # on incrémente le score correspondant

        elif choice == "2":  # Afficher scores
            print_results(results)

        elif choice in ["x", "q"]:  # Quitter le programme
            print_results(results)
            break

        # Si choix invalide (None), le menu sera affiché de nouveau
        

if __name__ == "__main__":
    main()
