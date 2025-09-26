# ========================================
# Exercise 1: Cats
# ========================================

class Cat:
    def __init__(self, cat_name, cat_age):
        self.name = cat_name
        self.age = cat_age

# Instantiate three cats
cat1 = Cat("Whiskers", 3)
cat2 = Cat("Tom", 5)
cat3 = Cat("Luna", 2)

# Function to find the oldest cat
def oldest_cat(*cats):
    return max(cats, key=lambda c: c.age)

oldest = oldest_cat(cat1, cat2, cat3)
print(f"The oldest cat is {oldest.name}, and is {oldest.age} years old.")


# ========================================
# Exercise 2: Dogs
# ========================================

class Dog:
    def __init__(self, name, height):
        self.name = name
        self.height = height

    def bark(self):
        print(f"{self.name} goes woof!")

    def jump(self):
        print(f"{self.name} jumps {self.height * 2} cm high!")

# Create objects
davids_dog = Dog("Rex", 50)
sarahs_dog = Dog("Teacup", 20)

# Print details and call methods
for dog in [davids_dog, sarahs_dog]:
    print(f"{dog.name} is {dog.height} cm tall.")
    dog.bark()
    dog.jump()

# Check which dog is bigger
if davids_dog.height > sarahs_dog.height:
    print(f"The bigger dog is {davids_dog.name}.")
else:
    print(f"The bigger dog is {sarahs_dog.name}.")


# ========================================
# Exercise 3: Who's the song producer?
# ========================================

class Song:
    def __init__(self, lyrics):
        self.lyrics = lyrics

    def sing_me_a_song(self):
        for line in self.lyrics:
            print(line)

# Example usage
stairway = Song([
    "There’s a lady who's sure",
    "all that glitters is gold",
    "and she’s buying a stairway to heaven"
])
print("\nSong Lyrics:")
stairway.sing_me_a_song()


# ========================================
# Exercise 4: Afternoon at the Zoo
# ========================================

class Zoo:
    def __init__(self, zoo_name):
        self.name = zoo_name
        self.animals = []

    def add_animal(self, new_animal):
        if new_animal not in self.animals:
            self.animals.append(new_animal)

    def get_animals(self):
        print(f"Animals in {self.name}: {self.animals}")

    def sell_animal(self, animal_sold):
        if animal_sold in self.animals:
            self.animals.remove(animal_sold)

    def sort_animals(self):
        self.animal_groups = {}
        for animal in sorted(self.animals):
            key = animal[0].upper()
            if key in self.animal_groups:
                if isinstance(self.animal_groups[key], list):
                    self.animal_groups[key].append(animal)
                else:
                    self.animal_groups[key] = [self.animal_groups[key], animal]
            else:
                self.animal_groups[key] = animal

    def get_groups(self):
        for key, group in self.animal_groups.items():
            print(f"{key}: {group}")


# Example usage
new_york_zoo = Zoo("New York Zoo")
# Adding animals
for animal in ["Giraffe", "Baboon", "Bear", "Cougar", "Ape", "Cat", "Eel", "Emu"]:
    new_york_zoo.add_animal(animal)

new_york_zoo.get_animals()
new_york_zoo.sell_animal("Cougar")
new_york_zoo.get_animals()

new_york_zoo.sort_animals()
print("\nAnimal Groups:")
new_york_zoo.get_groups()
