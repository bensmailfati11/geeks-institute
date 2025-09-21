import random

class Game:
    def get_user_item(self):
        valid_items = ["rock", "paper", "scissors"]
        while True:
            user_input = input("Choose an item (rock/paper/scissors): ").lower().strip()
            if user_input in valid_items:
                return user_input
            else:
                print("Invalid choice. Please choose rock, paper, or scissors.")

    def get_computer_item(self):
        items = ["rock", "paper", "scissors"]
        return random.choice(items)

    def get_game_result(self, user_item, computer_item):
        if user_item == computer_item:
            return "draw"
        
        if (user_item == "rock" and computer_item == "scissors") \
           or (user_item == "paper" and computer_item == "rock") \
           or (user_item == "scissors" and computer_item == "paper"):
            return "win"
        else:
            return "loss"

    def play(self):
        user_item = self.get_user_item()
        computer_item = self.get_computer_item()
        result = self.get_game_result(user_item, computer_item)

        if result == "win":
            print(f"You selected {user_item}. The computer selected {computer_item}. You win!")
        elif result == "loss":
            print(f"You selected {user_item}. The computer selected {computer_item}. You lose!")
        else:
            print(f"You selected {user_item}. The computer selected {computer_item}. It's a draw!")

        return result
