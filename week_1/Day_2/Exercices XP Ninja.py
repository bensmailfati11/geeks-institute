# ========================================
# Exercise 1: Cars
# ========================================

cars_str = "Volkswagen, Toyota, Ford Motor, Honda, Chevrolet"

# Convert into list
cars_list = cars_str.split(", ")
print(f"Car manufacturers list: {cars_list}")

# How many manufacturers
print(f"There are {len(cars_list)} manufacturers in the list.")

# Reverse/descending order (Z-A)
print("Manufacturers in reverse order (Z-A):")
print(sorted(cars_list, reverse=True))

# Count with letter "o"
with_o = [c for c in cars_list if "o" in c.lower()]
print(f"Manufacturers with 'o': {len(with_o)} -> {with_o}")

# Count without "i"
without_i = [c for c in cars_list if "i" not in c.lower()]
print(f"Manufacturers without 'i': {len(without_i)} -> {without_i}")

# Bonus: remove duplicates
cars_with_duplicates = ["Honda", "Volkswagen", "Toyota", "Ford Motor", "Honda", "Chevrolet", "Toyota"]
unique_cars = list(set(cars_with_duplicates))
print(f"\nCompanies without duplicates: {', '.join(unique_cars)}")
print(f"Now there are {len(unique_cars)} companies in the list.")

# Bonus: A-Z order but reverse letters of each name
reversed_names = [c[::-1] for c in sorted(unique_cars)]
print("Companies A-Z with reversed letters:")
print(reversed_names)


# ========================================
# Exercise 2: What’s your name?
# ========================================

def get_full_name(first_name, last_name, middle_name=None):
    # Capitalize each part
    first_name = first_name.capitalize()
    last_name = last_name.capitalize()
    if middle_name:
        middle_name = middle_name.capitalize()
        return f"{first_name} {middle_name} {last_name}"
    else:
        return f"{first_name} {last_name}"

print("\nName Examples:")
print(get_full_name(first_name="john", middle_name="hooker", last_name="lee"))
print(get_full_name(first_name="bruce", last_name="lee"))


# ========================================
# Exercise 3: From English to Morse
# ========================================

MORSE_CODE_DICT = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.',
    'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---',
    'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---',
    'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-',
    'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--',
    'Z': '--..',
    '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....',
    '6': '-....', '7': '--...', '8': '---..', '9': '----.', '0': '-----',
    ',': '--..--', '.': '.-.-.-', '?': '..--..', '/': '-..-.',
    '-': '-....-', '(': '-.--.', ')': '-.--.-', ' ': '/'
}

# English to Morse
def english_to_morse(text):
    return ' '.join(MORSE_CODE_DICT[char.upper()] for char in text if char.upper() in MORSE_CODE_DICT)

# Morse to English
def morse_to_english(code):
    morse_to_text = {v: k for k, v in MORSE_CODE_DICT.items()}
    return ''.join(morse_to_text[char] if char in morse_to_text else '' for char in code.split(' '))

print("\nMorse Code Examples:")
sample_text = "Hello World"
morse = english_to_morse(sample_text)
print(f"English: {sample_text}")
print(f"Morse: {morse}")
print(f"Back to English: {morse_to_english(morse)}")
