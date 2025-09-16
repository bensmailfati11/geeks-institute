import random

def compare_numbers(user_number):
    if not 1 <= user_number <= 100:
        print("Veuillez entrer un nombre entre 1 et 100.")
        return
    
    random_number = random.randint(1, 100)
    
    if user_number == random_number:
        print(f"Success! Both numbers are {user_number}")
    else:
        print(f"Fail! Your number: {user_number}, Random number: {random_number}")

compare_numbers(25)
