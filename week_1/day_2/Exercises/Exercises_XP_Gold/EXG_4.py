import random

# Roll a single dice
def throw_dice() -> int:
    return random.randint(1, 6)

# Keep rolling two dice until doubles appear
def throw_until_doubles() -> int:
    count = 0
    while True:
        count += 1
        d1, d2 = throw_dice(), throw_dice()
        # print(f"Throw {count}: ({d1}, {d2})")  # Optional: to see the process
        if d1 == d2:
            break
    return count

# Run the experiment 100 times
def main():
    results = []
    for _ in range(100):
        throws = throw_until_doubles()
        results.append(throws)

    total_throws = sum(results)
    average_throws = total_throws / len(results)

    print(f"Total throws to reach 100 doubles: {total_throws}")
    print(f"Average throws to reach doubles: {average_throws:.2f}")

# Run the main function
if __name__ == "__main__":
    main()
