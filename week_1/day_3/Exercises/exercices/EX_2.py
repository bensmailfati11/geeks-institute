class Dog :
    def __init__ (self,name,height) :
        self.name = name
        self.height = height

    def bark(self):
        self.name
        print(f"{self.name} goes woof!")

    def jump(self):
        self.name
        self.height
        print(f"{self.name} jumps ({self.height}*2) cm high!")

    def __str__(self):
        return f"(name={self.name}, height={self.height})"

def bigger_dog(*dogs):
    return max(dogs, key=lambda dog: dog.height)

davids_dog = Dog("Rex",50)
print(davids_dog)

davids_dog.bark()
davids_dog.jump()

sarahs_dog = Dog("Teacup",20)
print(sarahs_dog)

sarahs_dog.bark()
sarahs_dog.jump()

# Bigger Dog
bigger = bigger_dog(davids_dog,sarahs_dog)
print(f"The bigger dog is {bigger.name}")