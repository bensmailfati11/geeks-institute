""" Exercise 7 : List """

# Liste donnée
basket = ["Banana", "Apples", "Oranges", "Blueberries"]
print("Original basket:", basket)

# 1. Enlever Banana
basket.remove("Banana")
print("After removing Banana:", basket)

# 2. Enlever Blueberries
basket.remove("Blueberries")
print("After removing Blueberries:", basket)

# 3. Ajouter Kiwi à la fin
basket.append("Kiwi")
print("After adding Kiwi:", basket)

# 4. Ajouter Apples au début
basket.insert(0, "Apples")
print("After adding Apples at the beginning:", basket)

# 5. Compter combien de fois "Apples" apparaît
apple_count = basket.count("Apples")
print("Number of Apples:", apple_count)

# 6. Vider la liste
basket.clear()
print("Basket after clearing:", basket)
