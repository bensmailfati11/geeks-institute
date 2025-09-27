import random

class Game:
    def get_user_item(self):
        choice = ""
        while choice not in ["rock", "paper", "scissors"]:
            choice = input("Choose Rock, Paper, or Scissors: ").lower()
        return choice

    def get_computer_item(self):
        return random.choice(["rock", "paper", "scissors"])

    def get_game_result(self, user_item, computer_item):
        if user_item == computer_item:
            return "draw"
        elif (
            (user_item == "rock" and computer_item == "scissors") or
            (user_item == "paper" and computer_item == "rock") or
            (user_item == "scissors" and computer_item == "paper")
        ):
            return "win"
        else:
            return "loss"

    def play(self):
        user_choice = self.get_user_item()
        computer_choice = self.get_computer_item()
        result = self.get_game_result(user_choice, computer_choice)

        print(f"\nYou chose: {user_choice}")
        print(f"Computer chose: {computer_choice}")
        if result == "win":
            print("You won!")
        elif result == "loss":
            print("You lost!")
        else:
            print("It's a draw!")

        return result
