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
