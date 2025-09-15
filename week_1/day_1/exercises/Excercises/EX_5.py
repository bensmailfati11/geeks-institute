""" Exercise 5 : Favorite Numbers """

# 1. Créer un set avec mes nombres favoris
my_fav_numbers = {3, 7, 15}
print("My favorite numbers:", my_fav_numbers)

# 2. Ajouter deux nouveaux nombres
my_fav_numbers.add(42)
my_fav_numbers.add(99)
print("After adding two numbers:", my_fav_numbers)

# 3. Supprimer un nombre (pop enlève un élément "au hasard")
my_fav_numbers.pop()
print("After removing one number:", my_fav_numbers)

# 4. Créer le set d’un ami
friend_fav_numbers = {8, 15, 23}
print("Friend's favorite numbers:", friend_fav_numbers)

# 5. Fusionner les deux sets
our_fav_numbers = my_fav_numbers.union(friend_fav_numbers)
print("Our favorite numbers:", our_fav_numbers)
