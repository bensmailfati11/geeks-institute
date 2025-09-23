# Exercise 1: Predict Python Outputs
print("Exercise 1: Predict Python Outputs\n")

print(3 <= 3 < 9)            # True
print(3 == 3 == 3)           # True
print(bool(0))                # False
print(bool(5 == "5"))         # False
print(bool(4 == 4) == bool("4" == "4"))  # True
print(bool(bool(None)))       # False

x = (1 == True)               # True
y = (1 == False)              # False
a = True + 4                  # 1 + 4 = 5
b = False + 10                # 0 + 10 = 10

print("x is", x)
print("y is", y)
print("a:", a)
print("b:", b)

# ------------------------------------------------------

# Exercise 2: Longest Sentence Without 'A'
print("\nExercise 2: Longest Sentence Without 'A'\n")

longest_sentence = ""
while True:
    sentence = input("Enter a sentence without the letter 'A' (or type 'quit' to stop): ")
    
    if sentence.lower() == "quit":
        break
    
    if "A" in sentence.upper():
        print("Oops! Your sentence contains 'A'. Try again.")
    else:
        if len(sentence) > len(longest_sentence):
            longest_sentence = sentence
            print("Congratulations! You set a new longest sentence!")
        else:
            print("Good attempt, but not longer than the current longest.")
            
print("\nThe longest sentence without 'A' is:")
print(longest_sentence)

# ------------------------------------------------------

# Exercise 3: Paragraph Text Analysis
print("\nExercise 3: Paragraph Text Analysis\n")

paragraph = """
Python is an interpreted high-level general-purpose programming language. Its design philosophy emphasizes code readability with its use of significant indentation. Python is dynamically-typed and garbage-collected. It supports multiple programming paradigms, including structured, object-oriented, and functional programming.
"""

# Number of characters
num_characters = len(paragraph)

# Number of sentencess
import re
sentences = re.split(r'[.!?]+', paragraph)
sentences = [s.strip() for s in sentences if s.strip()]
num_sentences = len(sentences)

# Number of words
words = paragraph.split()
num_words = len(words)

# Unique words
unique_words = set([w.strip(".,").lower() for w in words])
num_unique_words = len(unique_words)

# Non-whitespace characters
num_non_whitespace = len(paragraph.replace(" ", "").replace("\n", ""))

# Average words per sentence
avg_words_per_sentence = num_words / num_sentences

# Non-unique words (appear more than once)
from collections import Counter
word_counts = Counter([w.strip(".,").lower() for w in words])
non_unique_count = sum([count for word, count in word_counts.items() if count > 1])

# Print results
print(f"Characters: {num_characters}")
print(f"Sentences: {num_sentences}")
print(f"Words: {num_words}")
print(f"Unique Words: {num_unique_words}")
print(f"Non-whitespace characters: {num_non_whitespace}")
print(f"Average words per sentence: {avg_words_per_sentence:.2f}")
print(f"Non-unique words count: {non_unique_count}")
