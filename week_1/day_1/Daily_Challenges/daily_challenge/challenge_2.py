def remove_consecutive_duplicates(word):
    if not word:  # if the string is empty
        return ""
    
    result = word[0]  # keep the first character
    for char in word[1:]:
        if char != result[-1]:  # add only if different from the last character in result
            result += char
    return result


# Ask the user for input
user_word = input("Enter a word: ")
print("New word without consecutive duplicates:", remove_consecutive_duplicates(user_word))
