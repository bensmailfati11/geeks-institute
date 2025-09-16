family = {}  

while True:
    name = input("Entrez le nom d'un membre de la famille (ou 'stop' pour finir) : ")
    if name.lower() == 'stop':
        break
    age = int(input(f"Entrez l'âge de {name} : "))
    family[name] = age

# Calcul du total
total_cost = 0
for member, age in family.items():
    if age < 3:
        price = 0
    elif 3 <= age <= 12:
        price = 10
    else:
        price = 15
    print(f"{member} doit payer ${price}")
    total_cost += price

print(f"Le coût total de la famille est ${total_cost}")
