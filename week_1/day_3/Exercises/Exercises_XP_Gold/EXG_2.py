import random

class MyList:
    def __init__(self, letters):
        self.letters = letters

    def reversed_list(self):
        return self.letters[::-1]

    def sorted_list(self):
        return sorted(self.letters)

    def random_list(self):
        return [random.randint(1, 100) for _ in range(len(self.letters))]

# Exemple d’utilisation
mylist = MyList(['d', 'a', 'c', 'b'])
print("Reversed:", mylist.reversed_list())
print("Sorted:", mylist.sorted_list())
print("Random list:", mylist.random_list())
