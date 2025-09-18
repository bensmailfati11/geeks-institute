# dogs = []
# def create_dog(name,age,breed):
#     print("A new dog has been initialized!")



#     dog = {
#         "name" : name,
#         "age" : age,
#         "breed" : breed,
#         "is_sleeping" : False
#     }
    
#     dogs.append(dog)
    
#     return dog

# # Appel de la fonction
# rex = create_dog("Rex", 3, "Labrador")
# print("Nombre de chiens :", rex)

# rex["colors"] = ["red","black","gray"]
# print(dogs)

class Cat:
    def __init__(self, cat_name, cat_age):
        self.name = cat_name
        self.age = cat_age

    def __str__(self):
        return f"(name={self.name}, age={self.age})"

def oldest_cat(*cats):
    return max(cats, key=lambda cat: cat.age)
            

cat_1 = Cat("mimi" , 2)
cat_2 = Cat("Catti" , 1)
cat_3 = Cat("soso" , 3)

print(cat_1)
print(cat_2)
print(cat_3)

# Recherche du plus vieux
oldest = oldest_cat(cat_1, cat_2, cat_3)
print(f"The oldest cat is {oldest.name}, and is {oldest.age} years old.")