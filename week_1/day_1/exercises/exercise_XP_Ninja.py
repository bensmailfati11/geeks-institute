""" Exercise 1 : Outputs """
x = (1 == True)   # True
y = (1 == False)  # False
a = True + 4      # True is 1 → 1 + 4 = 5
b = False + 10    # False is 0 → 0 + 10 = 10

print("x is", x)
print("y is", y)
print("a:", a)
print("b:", b)


""" Exercise 2 : Longest word without a specific character """

# Initialize the longest sentence variable
longest_sentence = ""

print("Enter sentences without the letter 'A' (type 'quit' to stop).")

while True:
    # Ask the user for a sentence
    sentence = input("Enter a sentence: ")

    # Option to quit the loop
    if sentence.lower() == "quit":
        break

    # Check if sentence contains the character 'A' or 'a'
    if "a" in sentence.lower():
        print("Oops! Your sentence contains the letter 'A'. Try again.")
        continue

    # Check if this sentence is longer than the current longest
    if len(sentence) > len(longest_sentence):
        longest_sentence = sentence
        print("Congratulations! This is the new longest sentence without 'A'.")
    else:
        print("Your sentence is valid but not longer than the current longest.")

print("\nThe longest sentence without 'A' was:")
print(longest_sentence)


""" Exercise 3: Working on a paragraph """

import string

# Sample paragraph (replace with any text you like)
paragraph = """
Python is an amazing programming language. It is widely used for web development, data science, artificial intelligence, and more.
Its simplicity and readability make it a popular choice among beginners and professionals alike.
Learning Python opens many opportunities in technology today.
"""

# 1️ Number of characters (including spaces and punctuation)
num_characters = len(paragraph)

# 2️ Number of sentences (split by ., !, ?)
sentences = [s for s in paragraph.split('.') if s.strip() != '']
num_sentences = len(sentences)

# 3️ Number of words
words = paragraph.split()
num_words = len(words)

# 4️ Number of unique words (case-insensitive, remove punctuation)
translator = str.maketrans('', '', string.punctuation)
clean_words = [w.translate(translator).lower() for w in words]
unique_words = set(clean_words)
num_unique_words = len(unique_words)

# Bonus 1: Non-whitespace characters
non_whitespace_chars = len(paragraph.replace(" ", "").replace("\n", ""))

# Bonus 2: Average words per sentence
avg_words_per_sentence = num_words / num_sentences if num_sentences != 0 else 0

# Bonus 3: Non-unique words count
num_non_unique_words = num_words - num_unique_words

# Print nicely formatted analysis
print("Paragraph Analysis:")
print(f"Total characters: {num_characters}")
print(f"Total sentences: {num_sentences}")
print(f"Total words: {num_words}")
print(f"Unique words: {num_unique_words}")
print(f"Non-whitespace characters: {non_whitespace_chars}")
print(f"Average words per sentence: {avg_words_per_sentence:.2f}")
print(f"Non-unique words count: {num_non_unique_words}")
