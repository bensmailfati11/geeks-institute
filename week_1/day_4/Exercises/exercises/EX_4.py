class Family:
    def __init__(self, last_name, members=None):
        self.last_name = last_name
        self.members = members if members else []

    def born(self, **kwargs):
        """Ajoute un enfant dans la famille"""
        self.members.append(kwargs)
        print(f"Félicitations à la famille {self.last_name} pour la naissance de {kwargs['name']} !")

    def is_18(self, name):
        """Retourne True si le membre est majeur, False sinon"""
        for member in self.members:
            if member["name"] == name:
                return member["age"] >= 18
        print(f"{name} n'existe pas dans la famille.")
        return False

    def family_presentation(self):
        """Affiche le nom de famille et les détails de chaque membre"""
        print(f"Famille {self.last_name} :")
        for member in self.members:
            print(f" - {member['name']}, {member['age']} ans, {member['gender']}, enfant ? {member['is_child']}")

# ---- Test ----
members = [
    {'name': 'Michael', 'age': 35, 'gender': 'Male', 'is_child': False},
    {'name': 'Sarah', 'age': 32, 'gender': 'Female', 'is_child': False}
]

my_family = Family("Smith", members)

# Présentation initiale
my_family.family_presentation()

# Vérification d’âge
print("Michael est-il majeur ?", my_family.is_18("Michael"))
print("Sarah est-elle majeure ?", my_family.is_18("Sarah"))

# Naissance d’un enfant
my_family.born(name="Emma", age=2, gender="Female", is_child=True)

# Présentation après naissance
my_family.family_presentation()
