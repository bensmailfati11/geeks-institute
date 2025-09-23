print("hello")
##############################################################################################
#exercices_1
print(("Hello world\n" * 4).strip())
##############################################################################################
#exercices_2
# (99³) × 8
result = (99 ** 3) * 8
print(result)
##############################################################################################
#exercices_3
# Ask the user to enter their name
user_name = input("Enter your name: ")
# Define your own name
my_name = "Fatima Zahra"
# Check if the names are the same
if user_name == my_name:
    print("Wow! We have the same name, are we secret twins? 😄")
else:
    print(f"Hi {user_name}! We don’t have the same name, but that’s cool too 😎")
##############################################################################################
# Exercise 4: Tall enough to ride a roller coaster
height = int(input("Enter your height in centimeters: "))
if height > 145:
    print("You are tall enough to ride the roller coaster! 🎢")
else:
    print("You need to grow some more to ride the roller coaster. 🌱")
##############################################################################################
# Exercise 5: Favorite Numbers
my_fav_numbers = {3, 7, 21}  # Your favorite numbers
my_fav_numbers.add(42)       # Add two numbers
my_fav_numbers.add(99)
my_fav_numbers.pop()          # Remove one number (random)
friend_fav_numbers = {8, 15, 23}  # Friend's favorite numbers
our_fav_numbers = my_fav_numbers.union(friend_fav_numbers)  # Combine sets
print("Our favorite numbers:", our_fav_numbers)
##############################################################################################
# Exercise 6: Tuple
my_tuple = (1, 2, 3)
# Tuples are immutable, cannot add directly
new_tuple = my_tuple + (4, 5)  # Create new tuple by concatenation
print(new_tuple)
##############################################################################################
# Exercise 7: List
basket = ["Banana", "Apples", "Oranges", "Blueberries"]
basket.remove("Banana")        # Remove Banana
basket.remove("Blueberries")    # Remove Blueberries
basket.append("Kiwi")           # Add Kiwi at the end
basket.insert(0, "Apples")      # Add Apples at the beginning
count_apples = basket.count("Apples")  # Count Apples
print("Number of Apples:", count_apples)
basket.clear()                  # Empty the basket
print(basket)
##############################################################################################
# Exercise 8: Sandwich Orders
sandwich_orders = ["Tuna sandwich", "Pastrami sandwich", "Avocado sandwich",
                   "Pastrami sandwich", "Egg sandwich", "Chicken sandwich", "Pastrami sandwich"]
# Remove all Pastrami sandwiches
while "Pastrami sandwich" in sandwich_orders:
    sandwich_orders.remove("Pastrami sandwich")

finished_sandwiches = []
while sandwich_orders:
    sandwich = sandwich_orders.pop(0)
    finished_sandwiches.append(sandwich)

# Print sandwiches made
for sandwich in finished_sandwiches:
    print(f"I made your {sandwich.lower()}")
