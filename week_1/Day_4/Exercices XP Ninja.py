import copy
import time
import os

class GameOfLife:
    def __init__(self, rows, cols, initial_state=None):
        """
        Initialize the game with rows x cols grid.
        initial_state: list of tuples (row, col) for live cells
        """
        self.rows = rows
        self.cols = cols
        self.grid = [[0 for _ in range(cols)] for _ in range(rows)]
        
        if initial_state:
            for r, c in initial_state:
                if 0 <= r < rows and 0 <= c < cols:
                    self.grid[r][c] = 1

    def display(self):
        """Print the current grid."""
        os.system('cls' if os.name == 'nt' else 'clear')
        for row in self.grid:
            print(' '.join(['█' if cell else ' ' for cell in row]))
        print("\n")

    def count_live_neighbors(self, row, col):
        """Count live neighbors of a cell at (row, col)."""
        directions = [(-1, -1), (-1, 0), (-1, 1),
                      (0, -1),          (0, 1),
                      (1, -1),  (1, 0), (1, 1)]
        count = 0
        for dr, dc in directions:
            r, c = row + dr, col + dc
            if 0 <= r < self.rows and 0 <= c < self.cols:
                count += self.grid[r][c]
        return count

    def next_generation(self):
        """Compute the next generation based on the rules."""
        new_grid = copy.deepcopy(self.grid)
        for r in range(self.rows):
            for c in range(self.cols):
                live_neighbors = self.count_live_neighbors(r, c)
                if self.grid[r][c] == 1:  # alive
                    if live_neighbors < 2 or live_neighbors > 3:
                        new_grid[r][c] = 0  # dies
                else:  # dead
                    if live_neighbors == 3:
                        new_grid[r][c] = 1  # becomes alive
        self.grid = new_grid

    def run(self, generations=10, delay=1):
        """Run the game for a number of generations."""
        for gen in range(generations):
            print(f"Generation {gen + 1}:")
            self.display()
            self.next_generation()
            time.sleep(delay)


# ===========================
# Example Usage
# ===========================

# Glider initial state
glider = [(1, 2), (2, 3), (3, 1), (3, 2), (3, 3)]

game = GameOfLife(rows=10, cols=10, initial_state=glider)
game.run(generations=15, delay=0.5)
