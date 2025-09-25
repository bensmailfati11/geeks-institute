import random

# ------------------------------------------------------
# Exercise 1: Convert Lists into Dictionaries
keys = ['Ten', 'Twenty', 'Thirty']
values = [10, 20, 30]
my_dict = dict(zip(keys, values))
print("Exercise 1 Output:", my_dict)

# ------------------------------------------------------
# Exercise 2: Cinemax #2
family = {"rick": 43, 'beth': 13, 'morty': 5, 'summer': 8}
total_cost = 0
for member, age in family.items():
    if age < 3:
        price = 0
    elif 3 <= age <= 12:
        price = 10
    else:
        price = 15
    total_cost += price
    print(f"{member.title()} pays: ${price}")
print("Total family cost:", total_cost)

# Bonus: user input version
user_family = {}
while True:
    name = input("\nEnter family member's name (or 'done' to finish): ")
    if name.lower() == "done":
        break
    age = int(input(f"Enter {name}'s age: "))
    user_family[name] = age
print("User Family:", user_family)

# ------------------------------------------------------
# Exercise 3: Zara
brand = {
    "name": "Zara",
    "creation_date": 1975,
    "creator_name": "Amancio Ortega Gaona",
    "type_of_clothes": ["men", "women", "children", "home"],
    "international_competitors": ["Gap", "H&M", "Benetton"],
    "number_stores": 7000,
    "major_color": {"France": "blue", "Spain": "red", "US": ["pink", "green"]}
}

# Modifications
brand["number_stores"] = 2
print(f"Zara's clients: {brand['type_of_clothes']}")
brand["country_creation"] = "Spain"
if "international_competitors" in brand:
    brand["international_competitors"].append("Desigual")
del brand["creation_date"]
print("Last international competitor:", brand["international_competitors"][-1])
print("US major colors:", brand["major_color"]["US"])
print("Number of key-value pairs:", len(brand))
print("Dictionary keys:", brand.keys())

more_on_zara = {"creation_date": 1975, "number_stores": 10000}
brand.update(more_on_zara)
print("Updated number of stores:", brand["number_stores"])

# ------------------------------------------------------
# Exercise 4: Some Geography
def describe_city(city, country="Iceland"):
    print(f"{city} is in {country}.")

describe_city("Reykjavik")
describe_city("Paris", "France")

# ------------------------------------------------------
# Exercise 5: Random number comparison
def random_compare(user_number):
    rand_number = random.randint(1, 100)
    print(f"Your number: {user_number}, Random number: {rand_number}")
    if user_number == rand_number:
        print("Success! 🎉")
    else:
        print("Fail 😢")

random_compare(50)  # example

# ------------------------------------------------------
# Exercise 6: Personalized Shirts
def make_shirt(size="Large", text="I love Python"):
    print(f"The size of the shirt is {size} and the text is '{text}'")

make_shirt()
make_shirt("Medium")
make_shirt("Small", "Hello World")
make_shirt(text="Custom Message", size="XL")  # keyword arguments

# ------------------------------------------------------
# Exercise 7: Temperature Advice
def get_random_temp(season=None):
    if season == "winter":
        low, high = -10, 16
    elif season == "spring":
        low, high = 0, 23
    elif season == "summer":
        low, high = 16, 40
    elif season == "autumn":
        low, high = -5, 25
    else:
        low, high = -10, 40
    return random.randint(low, high)

def main():
    month = int(input("Enter month number (1-12): "))
    if month in [12,1,2]:
        season = "winter"
    elif month in [3,4,5]:
        season = "spring"
    elif month in [6,7,8]:
        season = "summer"
    else:
        season = "autumn"

    temp = get_random_temp(season)
    print(f"The temperature right now is {temp}°C")

    if temp < 0:
        print("Brrr, that's freezing! Wear extra layers!")
    elif 0 <= temp <= 16:
        print("Quite chilly! Don't forget your coat!")
    elif 16 < temp <= 23:
        print("Nice weather! A light jacket is fine.")
    elif 24 <= temp <= 32:
        print("Warm! Dress comfortably.")
    else:
        print("Hot! Stay hydrated and cool!")

main()

# ------------------------------------------------------
# Exercise 8: Star Wars Quiz
data = [
    {"question": "What is Baby Yoda's real name?", "answer": "Grogu"},
    {"question": "Where did Obi-Wan take Luke after his birth?", "answer": "Tatooine"},
    {"question": "What year did the first Star Wars movie come out?", "answer": "1977"},
    {"question": "Who built C-3PO?", "answer": "Anakin Skywalker"},
    {"question": "Anakin Skywalker grew up to be who?", "answer": "Darth Vader"},
    {"question": "What species is Chewbacca?", "answer": "Wookiee"}
]

def star_wars_quiz():
    correct = 0
    incorrect = 0
    wrong_answers = []

    for item in data:
        user_ans = input(item["question"] + " ")
        if user_ans.strip().lower() == item["answer"].lower():
            correct += 1
        else:
            incorrect += 1
            wrong_answers.append({"question": item["question"], "your_answer": user_ans, "correct_answer": item["answer"]})

    print(f"\nCorrect answers: {correct}")
    print(f"Incorrect answers: {incorrect}")

    if wrong_answers:
        print("\nWrong Answers:")
        for wa in wrong_answers:
            print(f"Q: {wa['question']}")
            print(f"Your answer: {wa['your_answer']}, Correct answer: {wa['correct_answer']}")

    if incorrect > 3:
        print("\nYou had more than 3 wrong answers. Try again!")
        star_wars_quiz()

star_wars_quiz()
