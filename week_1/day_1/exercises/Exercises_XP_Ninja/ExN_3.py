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
