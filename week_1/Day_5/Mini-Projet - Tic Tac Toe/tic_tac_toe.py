def display_board(board):
    """Displays the current board"""
    print("\n")
    print(f" {board[0]} | {board[1]} | {board[2]} ")
    print("---|---|---")
    print(f" {board[3]} | {board[4]} | {board[5]} ")
    print("---|---|---")
    print(f" {board[6]} | {board[7]} | {board[8]} ")
    print("\n")

def player_input(player, board):
    """Asks the player for a position (1-9) and validates input"""
    while True:
        try:
            position = int(input(f"Player {player} ({player_mark[player]}), choose a position (1-9): ")) - 1
            if position < 0 or position > 8:
                print("Invalid input. Choose a number from 1 to 9.")
            elif board[position] != " ":
                print("This position is already taken. Choose another one.")
            else:
                return position
        except ValueError:
            print("Invalid input. Enter a number.")

def check_win(board):
    """Checks if there is a winner"""
    win_conditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  # rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  # columns
        [0, 4, 8], [2, 4, 6]              # diagonals
    ]
    for combo in win_conditions:
        if board[combo[0]] == board[combo[1]] == board[combo[2]] != " ":
            return board[combo[0]]  # return the mark (X or O) of the winner
    if " " not in board:
        return "Tie"  # board full and no winner
    return None  # game continues

def play():
    """Main game loop"""
    board = [" "] * 9
    current_player = 1

    display_board(board)

    while True:
        position = player_input(current_player, board)
        board[position] = player_mark[current_player]

        display_board(board)

        result = check_win(board)
        if result:
            if result == "Tie":
                print("The game is a tie!")
            else:
                print(f"Player {current_player} ({result}) wins!")
            break

        # Switch player
        current_player = 2 if current_player == 1 else 1

# Mapping players to marks
player_mark = {1: "X", 2: "O"}

# Start the game
if __name__ == "__main__":
    play()
