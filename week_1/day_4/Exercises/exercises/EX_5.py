# TheIncredibles class
class TheIncredibles(Family):
    def __init__(self, last_name, members):
        super().__init__(last_name, members)

    def use_power(self, name):
        for member in self.members:
            if member['name'] == name:
                if member['age'] >= 18:
                    print(f"{member['name']}'s power is: {member['power']}")
                else:
                    raise Exception(f"{member['name']} is not over 18 years old!")
                return
        print(f"No member found with the name {name}")

    def incredible_presentation(self):
        print("\n Here is our powerful family ")
        super().family_presentation()



# Création d'une instance


incredibles = TheIncredibles("Incredibles", [
    {'name': 'Michael', 'age': 35, 'gender': 'Male', 'is_child': False, 'power': 'fly', 'incredible_name': 'MikeFly'},
    {'name': 'Sarah', 'age': 32, 'gender': 'Female', 'is_child': False, 'power': 'read minds', 'incredible_name': 'SuperWoman'}
])

# Présentation initiale
incredibles.incredible_presentation()

# Utilisation du pouvoir
incredibles.use_power("Michael")

# Ajout de Baby Jack
incredibles.born(name="Jack", age=1, gender="Male", is_child=True, power="Unknown Power", incredible_name="BabyJack")

# Nouvelle présentation
incredibles.incredible_presentation()
