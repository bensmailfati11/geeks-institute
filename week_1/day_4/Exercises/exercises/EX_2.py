class Dog:
    
    def __init__ (self,name, age, weight):
        self.name = name
        self.age = age
        self.weight = weight
    
    def bark(self):
        return f"{self.name} is barking"
    
    def run_speed(self):
        return (self.weight / self.age) * 10

    def fight(self, other_dog):
        my_power = self.run_speed() * self.weight
        other_power = other_dog.run_speed() * other_dog.weight

        if my_power > other_power:
            return f"{self.name} won the fight against {other_dog.name}"
        elif my_power < other_power:
            return f"{other_dog.name} won the fight against {self.name}"
        else:
            return f"{self.name} and {other_dog.name} are evenly matched"


# Création de 3 chiens
dog1 = Dog("Rex", 4, 20)
dog2 = Dog("Buddy", 3, 25)
dog3 = Dog("Max", 5, 30)

# Test des méthodes
dogs = [dog1, dog2, dog3]

for dog in dogs:
    print(dog.bark())
    print(f"{dog.name}'s run speed: {dog.run_speed():.2f}")

# Simuler des combats
print(dog1.fight(dog2))
print(dog2.fight(dog3))
print(dog1.fight(dog3))

