class Zoo:
    def __init__(self, zoo_name):
        self.zoo_name = zoo_name
        self.animals = []   # on initialise avec une liste vide

    def add_animal(self, new_animal):
        if new_animal not in self.animals:
            self.animals.append(new_animal)
            print(f"{new_animal} a été ajouté au zoo.")
        else:
            print(f"{new_animal} est déjà dans le zoo !")

    def get_animals(self):
        print(f"Tous les animaux du zoo {self.zoo_name} : {self.animals}")
    
    def sell_animal(self, animal_sold):
        if animal_sold in self.animals:
            self.animals.remove(animal_sold)
            print(f"{animal_sold} a été vendu.")
        else:
            print(f"{animal_sold} n’est pas dans le zoo.")

    def sort_animals(self):
        sorted_animals = sorted(self.animals)  
        grouped = {}  

        for animal in sorted_animals:
            first_letter = animal[0].upper()
            if first_letter not in grouped:
                grouped[first_letter] = []
            grouped[first_letter].append(animal)

        # simplification : si une seule valeur, on ne garde pas une liste
        for key in grouped:
            if len(grouped[key]) == 1:
                grouped[key] = grouped[key][0]

        return grouped
    
    def get_groups(self):
        groups = self.sort_animals()
        for letter, animals in groups.items():
            print(f"{letter}: {animals}")

new_york_zoo = Zoo("NY Zoo")

new_york_zoo.add_animal("Lion")
new_york_zoo.add_animal("Tiger")
new_york_zoo.add_animal("Bear")
new_york_zoo.add_animal("Baboon")
new_york_zoo.add_animal("Cougar")

new_york_zoo.get_animals()
new_york_zoo.sell_animal("Tiger")
new_york_zoo.get_animals()
new_york_zoo.get_groups()
