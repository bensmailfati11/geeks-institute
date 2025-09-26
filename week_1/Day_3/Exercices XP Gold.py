# ========================================
# Exercise 1: Geometry - Circle
# ========================================

import math

class Circle:
    def __init__(self, radius=1.0):
        self.radius = radius

    # Method to compute perimeter (circumference)
    def perimeter(self):
        return 2 * math.pi * self.radius

    # Method to compute area
    def area(self):
        return math.pi * (self.radius ** 2)

    # Method to print geometrical definition
    def definition(self):
        print("A circle is a shape consisting of all points in a plane that are at a given distance from a center point.")


# Example usage
c = Circle(5)
print("Circle radius:", c.radius)
print("Perimeter:", round(c.perimeter(), 2))
print("Area:", round(c.area(), 2))
c.definition()


# ========================================
# Exercise 2: Custom List Class
# ========================================

import random

class MyList:
    def __init__(self, mylist):
        self.mylist = mylist

    # Method to reverse the list
    def reversed_list(self):
        return self.mylist[::-1]

    # Method to sort the list
    def sorted_list(self):
        return sorted(self.mylist)

    # Bonus: Generate a second list with random numbers of same length
    def random_number_list(self):
        return [random.randint(1, 100) for _ in range(len(self.mylist))]


# Example usage
letters = ['b', 'a', 'd', 'c']
ml = MyList(letters)
print("\nOriginal list:", letters)
print("Reversed list:", ml.reversed_list())
print("Sorted list:", ml.sorted_list())
print("Random number list:", ml.random_number_list())


# ========================================
# Exercise 3: Restaurant Menu Manager
# ========================================

class MenuManager:
    def __init__(self):
        # Initialize menu with given dishes
        self.menu = [
            {"name": "Soup", "price": 10, "spice": "B", "gluten": False},
            {"name": "Hamburger", "price": 15, "spice": "A", "gluten": True},
            {"name": "Salad", "price": 18, "spice": "A", "gluten": False},
            {"name": "French Fries", "price": 5, "spice": "C", "gluten": False},
            {"name": "Beef bourguignon", "price": 25, "spice": "B", "gluten": True},
        ]

    # Method to add a dish
    def add_item(self, name, price, spice, gluten):
        self.menu.append({"name": name, "price": price, "spice": spice, "gluten": gluten})
        print(f"Added {name} to menu.")

    # Method to update a dish
    def update_item(self, name, price, spice, gluten):
        for dish in self.menu:
            if dish["name"] == name:
                dish.update({"price": price, "spice": spice, "gluten": gluten})
                print(f"{name} has been updated.")
                return
        print(f"{name} is not in the menu.")

    # Method to remove a dish
    def remove_item(self, name):
        for dish in self.menu:
            if dish["name"] == name:
                self.menu.remove(dish)
                print(f"{name} has been removed from the menu.")
                print("Updated menu:", self.menu)
                return
        print(f"{name} is not in the menu.")


# Example usage
manager = MenuManager()
print("\nInitial menu:", manager.menu)

manager.add_item("Pizza", 20, "B", True)
manager.update_item("Salad", 19, "B", False)
manager.remove_item("Soup")
manager.remove_item("Pasta")  # Non-existent dish
