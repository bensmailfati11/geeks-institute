# ========================================
# Exercise 1: Birthday Look-up
# ========================================

birthdays = {
    "Alice": "1995/07/21",
    "Bob": "1990/05/10",
    "Charlie": "2000/12/03",
    "Diana": "1988/03/15",
    "Eve": "1999/11/25"
}

print("🎉 Welcome! You can look up the birthdays of the people in the list!")
name = input("Enter a name: ")

if name in birthdays:
    print(f"{name}'s birthday is {birthdays[name]}")
else:
    print(f"Sorry, we don’t have the birthday information for {name}")



# ========================================
# Exercise 2: Birthdays Advanced
# ========================================

print("\nWe know the birthdays of these people:")
for person in birthdays.keys():
    print(person)

name = input("Enter a name from the list: ")

if name in birthdays:
    print(f"{name}'s birthday is {birthdays[name]}")
else:
    print(f"❌ Sorry, we don’t have the birthday information for {name}")



# ========================================
# Exercise 3: Sum (X + XX + XXX + XXXX)
# ========================================

def special_sum(x: int) -> int:
    return int(str(x)) + int(str(x)*2) + int(str(x)*3) + int(str(x)*4)

num = int(input("\nEnter a number (X): "))
print(f"The result of X+XX+XXX+XXXX is: {special_sum(num)}")



# ========================================
# Exercise 4: Double Dice
# ========================================

import random

def throw_dice() -> int:
    return random.randint(1, 6)

def throw_until_doubles() -> int:
    count = 0
    while True:
        d1, d2 = throw_dice(), throw_dice()
        count += 1
        if d1 == d2:
            break
    return count

def main():
    results = []
    for _ in range(100):
        results.append(throw_until_doubles())
    
    total_throws = sum(results)
    avg_throws = total_throws / len(results)

    print("\n🎲 Double Dice Results:")
    print(f"Total throws to reach 100 doubles: {total_throws}")
    print(f"Average throws per double: {avg_throws:.2f}")

main()
