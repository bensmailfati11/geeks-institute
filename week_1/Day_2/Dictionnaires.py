# ========================================
# Daily Challenge: Letter Index Mapping
# ========================================

# Ask the user for a word
word = input("Enter a word: ")

# Initialize an empty dictionary to store letters and their positions
letter_positions = {}

# Iterate over the word with both index and character
for index, letter in enumerate(word):
    # If the letter is not already a key in the dictionary, add it with a list
    if letter not in letter_positions:
        letter_positions[letter] = []
    # Append the current index to the letter's list
    letter_positions[letter].append(index)

# Print the result
print(f"\nLetter index mapping for '{word}':")
print(letter_positions)
