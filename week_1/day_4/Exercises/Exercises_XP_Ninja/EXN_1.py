# game_of_life.py
from collections import Counter
import time
import os
import sys

class GameOfLife:
    """
    Conway's Game of Life using a sparse set-of-live-cells representation.

    Parameters:
    - live_cells: iterable of (r, c) tuples marking initially alive cells.
    - rows, cols: grid size used only when fixed=True (ignored for expandable mode display,
                  but used to enforce bounds if fixed).
    - fixed: if True, borders are fixed (cells outside [0..rows-1]x[0..cols-1] are discarded).
             if False, grid is effectively infinite (coordinates can be negative/large),
             but bounded by max_size to avoid runaway memory use.
    - max_size: maximum allowed span in rows or cols when using expandable mode (protects memory).
    """
    NEIGHBOR_OFFSETS = [(-1, -1), (-1, 0), (-1, 1),
                        (0, -1),           (0, 1),
                        (1, -1),  (1, 0),  (1, 1)]

    def __init__(self, live_cells=None, rows=20, cols=40, fixed=True, max_size=10000):
        self.live = set(live_cells) if live_cells else set()
        self.rows = rows
        self.cols = cols
        self.fixed = fixed
        self.max_size = max_size

        # history for cycle detection: map frozenset(live) -> generation index
        self.seen = {}

        # generation counter
        self.generation = 0

    def _in_bounds(self, cell):
        if not self.fixed:
            return True
        r, c = cell
        return 0 <= r < self.rows and 0 <= c < self.cols

    def step(self):
        """
        Compute next generation according to the Game of Life rules.
        """
        neighbor_counts = Counter()

        # Count neighbors for all live cells and neighbors
        for (r, c) in self.live:
            for dr, dc in self.NEIGHBOR_OFFSETS:
                neighbor = (r + dr, c + dc)
                neighbor_counts[neighbor] += 1

        new_live = set()

        # Check each cell that has any neighbor activity
        for cell, count in neighbor_counts.items():
            if not self._in_bounds(cell):
                # if fixed borders, cells outside are not allowed
                if self.fixed:
                    continue
                # if expandable, still allowed (but we will check max_size later)
            if cell in self.live:
                # survival rules
                if count == 2 or count == 3:
                    new_live.add(cell)
            else:
                # birth rule
                if count == 3:
                    new_live.add(cell)

        # If fixed borders, we should also consider that an isolated live cell with zero neighbors
        # will have no entry in neighbor_counts and thus won't be in new_live -> it dies (correct).
        self.generation += 1
        self.live = new_live

        # If expandable, check span does not exceed max_size
        if not self.fixed and self.live:
            rs = [r for r, _ in self.live]
            cs = [c for _, c in self.live]
            height = max(rs) - min(rs) + 1
            width  = max(cs) - min(cs) + 1
            if height > self.max_size or width > self.max_size:
                raise MemoryError(f"Grid span exceeded max_size ({self.max_size}).")

    def is_extinct(self):
        return len(self.live) == 0

    def detect_cycle_or_stable(self):
        """
        Returns:
         - ('stable', generation_index) if we hit an identical previous configuration
         - ('new', None) if configuration is new
        """
        key = frozenset(self.live)
        if key in self.seen:
            return ('cycle', self.seen[key])  # indicates an oscillation or repeated state
        else:
            self.seen[key] = self.generation
            return ('new', None)

    def _clear_terminal(self):
        # clear terminal for nicer visualization
        if os.name == 'nt':
            os.system('cls')
        else:
            os.system('clear')

    def display(self, max_display_rows=25, max_display_cols=80, padding=1, clear=True):
        """
        Print the grid to terminal.

        For fixed: prints the full fixed grid of (rows x cols).
        For expandable: prints bounding box around live cells plus `padding`, but
        limited by max_display_rows/cols to avoid printing huge grids.
        """
        if clear:
            self._clear_terminal()

        if self.fixed:
            r0, r1 = 0, self.rows - 1
            c0, c1 = 0, self.cols - 1
        else:
            if not self.live:
                # nothing to show -> small blank grid
                r0, r1, c0, c1 = 0, min(9, max_display_rows - 1), 0, min(19, max_display_cols - 1)
            else:
                rs = [r for r, _ in self.live]
                cs = [c for _, c in self.live]
                r0, r1 = min(rs) - padding, max(rs) + padding
                c0, c1 = min(cs) - padding, max(cs) + padding

                # limit display size:
                height = r1 - r0 + 1
                width  = c1 - c0 + 1
                if height > max_display_rows:
                    center_r = (r0 + r1) // 2
                    r0 = center_r - max_display_rows // 2
                    r1 = r0 + max_display_rows - 1
                if width > max_display_cols:
                    center_c = (c0 + c1) // 2
                    c0 = center_c - max_display_cols // 2
                    c1 = c0 + max_display_cols - 1

        # header
        print(f"Generation: {self.generation}  Live cells: {len(self.live)}  Mode: {'fixed' if self.fixed else 'expandable'}")
        for r in range(r0, r1 + 1):
            line_chars = []
            for c in range(c0, c1 + 1):
                line_chars.append('█' if (r, c) in self.live else ' ')
            print(''.join(line_chars))
        print()  # blank line

    def run(self, generations=100, pause=0.2, stop_on_cycle=True, stop_on_extinction=True, display=True):
        """
        Run the Game of Life for up to `generations` steps.

        - pause: seconds to wait between generations (set to 0 for fast).
        - stop_on_cycle: stop early if a repeated configuration occurs (oscillation or stable).
        - stop_on_extinction: stop if no live cells remain.
        - display: if True, print each generation (may clear screen).
        """
        # seed current state to seen (so generation 0 is tracked)
        self.seen = {}
        self.seen[frozenset(self.live)] = self.generation

        if display:
            self.display()

        for _ in range(generations):
            prev_live = set(self.live)
            self.step()
            status, first_seen = self.detect_cycle_or_stable()
            if display:
                self.display()
            if stop_on_extinction and self.is_extinct():
                print(f"All cells died at generation {self.generation}.")
                return 'extinct', self.generation
            if stop_on_cycle and status == 'cycle':
                cycle_length = self.generation - first_seen
                print(f"Cycle detected: configuration repeated. First seen at gen {first_seen}. Current gen {self.generation}. Cycle length: {cycle_length}.")
                return 'cycle', cycle_length
            time.sleep(pause)
        return 'ran_to_completion', generations

# -------------------------
# Helper patterns / examples
# -------------------------
def pattern_block(offset=(0, 0)):
    # 2x2 still life
    r, c = offset
    return {(r, c), (r, c+1), (r+1, c), (r+1, c+1)}

def pattern_blinker(offset=(0, 0)):
    r, c = offset
    return {(r, c), (r, c+1), (r, c+2)}  # horizontal blinker

def pattern_glider(offset=(0, 0)):
    r, c = offset
    return {(r, c+1), (r+1, c+2), (r+2, c), (r+2, c+1), (r+2, c+2)}

# -------------------------
# Example run if executed
# -------------------------
if __name__ == '__main__':
    # Choose an example initial state:
    examples = {
        'block': pattern_block((5, 5)),
        'blinker': pattern_blinker((5, 10)),
        'glider': pattern_glider((1, 1)),
    }

    # Pick one: 'block', 'blinker', or 'glider'
    choice = 'glider' if len(sys.argv) == 1 else sys.argv[1]

    if choice not in examples:
        print("Available examples: ", list(examples.keys()))
        sys.exit(1)

    # Example 1: fixed borders (20x40)
    gol_fixed = GameOfLife(live_cells=examples[choice], rows=20, cols=40, fixed=True)
    print("Fixed borders example. Press Enter to run 30 generations.")
    input()
    gol_fixed.run(generations=30, pause=0.1, display=True)

    # Example 2: expandable (infinite-like)
    print("Now running expandable mode with the same initial pattern (press Enter).")
    input()
    gol_exp = GameOfLife(live_cells=examples[choice], fixed=False, max_size=1000)
    gol_exp.run(generations=60, pause=0.05, display=True)
