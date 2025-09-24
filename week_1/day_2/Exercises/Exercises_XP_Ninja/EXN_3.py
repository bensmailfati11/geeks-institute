# Table de correspondance
MORSE_CODE = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 
    'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---',
    'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---',
    'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-', 
    'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--',
    'Z': '--..', 
    '0': '-----', '1': '.----', '2': '..---', '3': '...--',
    '4': '....-', '5': '.....', '6': '-....', '7': '--...', 
    '8': '---..', '9': '----.'
}

# Conversion EN → Morse
def text_to_morse(text):
    return ' / '.join(
        ' '.join(MORSE_CODE.get(ch.upper(), '') for ch in word) 
        for word in text.split()
    )

# Conversion Morse → EN
def morse_to_text(morse):
    reverse_dict = {v: k for k, v in MORSE_CODE.items()}
    return ' '.join(
        ''.join(reverse_dict.get(code, '') for code in word.split())
        for word in morse.split(' / ')
    )

# Exemples
english = "Hello World"
morse = text_to_morse(english)
print("Texte en morse :", morse)

decoded = morse_to_text(morse)
print("Morse décodé :", decoded)
