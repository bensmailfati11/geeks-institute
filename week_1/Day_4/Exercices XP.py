# ===========================
# Exercise 1: Pets
# ===========================

class Pets:
    def __init__(self, animals):
        self.animals = animals

    def walk(self):
        for animal in self.animals:
            print(animal.walk())


class Cat:
    is_lazy = True

    def __init__(self, name, age):
        self.name = name
        self.age = age

    def walk(self):
        return f'{self.name} is just walking around'


class Bengal(Cat):
    def sing(self, sounds):
        return f'{sounds}'


class Chartreux(Cat):
    def sing(self, sounds):
        return f'{sounds}'


# New cat breed: Siamese
class Siamese(Cat):
    def sing(self, sounds):
        return f'{sounds}'


# Create instances
bengal_cat = Bengal("Leo", 3)
chartreux_cat = Chartreux("Milo", 5)
siamese_cat = Siamese("Luna", 2)

all_cats = [bengal_cat, chartreux_cat, siamese_cat]
sara_pets = Pets(all_cats)

# Take all cats for a walk
sara_pets.walk()

# ===========================
# Exercise 2: Dogs
# ===========================

class Dog:
    def __init__(self, name, age, weight):
        self.name = name
        self.age = age
        self.weight = weight

    def bark(self):
        return f"{self.name} is barking"

    def run_speed(self):
        return self.weight / self.age * 10

    def fight(self, other_dog):
        self_power = self.run_speed() * self.weight
        other_power = other_dog.run_speed() * other_dog.weight
        if self_power > other_power:
            return f"{self.name} won the fight"
        elif self_power < other_power:
            return f"{other_dog.name} won the fight"
        else:
            return "It's a tie!"


# Create 3 dogs
dog1 = Dog("Rex", 5, 30)
dog2 = Dog("Buddy", 3, 20)
dog3 = Dog("Max", 4, 25)

# Fight examples
print(dog1.fight(dog2))
print(dog2.fight(dog3))

# ===========================
# Exercise 3: Dogs Domesticated
# ===========================

import random

class PetDog(Dog):
    def __init__(self, name, age, weight):
        super().__init__(name, age, weight)
        self.trained = False

    def train(self):
        print(self.bark())
        self.trained = True

    def play(self, *dogs):
        dog_names = ", ".join([self.name] + [dog.name for dog in dogs])
        print(f"{dog_names} all play together")

    def do_a_trick(self):
        if self.trained:
            tricks = [
                f"{self.name} does a barrel roll",
                f"{self.name} stands on his back legs",
                f"{self.name} shakes your hand",
                f"{self.name} plays dead"
            ]
            print(random.choice(tricks))
        else:
            print(f"{self.name} is not trained yet!")


# ===========================
# Exercise 4: Family
# ===========================

class Family:
    def __init__(self, last_name, members):
        self.last_name = last_name
        self.members = members  # List of dictionaries

    def born(self, **kwargs):
        self.members.append(kwargs)
        print(f"Congratulations! {kwargs['name']} was born!")

    def is_18(self, name):
        for member in self.members:
            if member['name'] == name:
                return member['age'] >= 18
        return False

    def family_presentation(self):
        print(f"Family {self.last_name}:")
        for member in self.members:
            print(member)


# Example family
family_members = [
    {'name':'Michael','age':35,'gender':'Male','is_child':False},
    {'name':'Sarah','age':32,'gender':'Female','is_child':False}
]

my_family = Family("Smith", family_members)
my_family.family_presentation()
print(my_family.is_18("Michael"))
my_family.born(name="Emma", age=0, gender="Female", is_child=True)
my_family.family_presentation()

# ===========================
# Exercise 5: The Incredibles
# ===========================

class TheIncredibles(Family):
    def use_power(self, name):
        for member in self.members:
            if member['name'] == name:
                if member['age'] >= 18:
                    print(f"{member['name']}'s power: {member['power']}")
                else:
                    raise Exception(f"{member['name']} is not over 18 years old!")

    def incredible_presentation(self):
        print("Here is our powerful family **")
        super().family_presentation()


# Create Incredibles family
incredibles_members = [
    {'name':'Michael','age':35,'gender':'Male','is_child':False,'power': 'fly','incredible_name':'MikeFly'},
    {'name':'Sarah','age':32,'gender':'Female','is_child':False,'power': 'read minds','incredible_name':'SuperWoman'}
]

incredibles = TheIncredibles("Incredibles", incredibles_members)
incredibles.incredible_presentation()

# Add Baby Jack
incredibles.born(name="Baby Jack", age=0, gender="Male", is_child=True, power="Unknown Power", incredible_name="BabyJack")
incredibles.incredible_presentation()

# Example of using power
incredibles.use_power("Michael")
# incredibles.use_power("Baby Jack")  # This will raise Exception
