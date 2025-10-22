// =============================================
// 1st Daily Challenge: Word Processing
// =============================================

/**
 * Capitalizes all words in array if they are strings
 * @param {Array} words - Array of words
 * @returns {Promise} - Resolves with uppercased array or rejects with error
 */
function makeAllCaps(words) {
    return new Promise((resolve, reject) => {
        // Check if all elements are strings
        const allStrings = words.every(word => typeof word === 'string');
        
        if (allStrings) {
            const uppercased = words.map(word => word.toUpperCase());
            resolve(uppercased);
        } else {
            reject("Error: Array contains non-string elements");
        }
    });
}

/**
 * Sorts words alphabetically if array length > 4
 * @param {Array} words - Array of uppercased words
 * @returns {Promise} - Resolves with sorted array or rejects with error
 */
function sortWords(words) {
    return new Promise((resolve, reject) => {
        if (words.length > 4) {
            const sorted = words.sort();
            resolve(sorted);
        } else {
            reject("Error: Array length must be greater than 4");
        }
    });
}

// Test the first challenge
console.log("=== 1st Daily Challenge: Word Processing ===");

// Test Case 1: Array contains a number (should reject)
console.log("\nTest 1: Array with number");
makeAllCaps([1, "pear", "banana"])
    .then((arr) => sortWords(arr))
    .then((result) => {
        console.log("Success:", result);
    })
    .catch(error => {
        console.log("Error:", error);
    });

// Test Case 2: Array length <= 4 (should reject)
console.log("\nTest 2: Array length 3");
makeAllCaps(["apple", "pear", "banana"])
    .then((arr) => sortWords(arr))
    .then((result) => {
        console.log("Success:", result);
    })
    .catch(error => {
        console.log("Error:", error);
    });

// Test Case 3: Valid input (should resolve)
console.log("\nTest 3: Valid array with 5 elements");
makeAllCaps(["apple", "pear", "banana", "melon", "kiwi"])
    .then((arr) => sortWords(arr))
    .then((result) => {
        console.log("Success:", result);
    })
    .catch(error => {
        console.log("Error:", error);
    });

// =============================================
// 2nd Daily Challenge: Morse Code Translator
// =============================================

const morse = `{
    "0": "-----",
    "1": ".----",
    "2": "..---",
    "3": "...--",
    "4": "....-",
    "5": ".....",
    "6": "-....",
    "7": "--...",
    "8": "---..",
    "9": "----.",
    "a": ".-",
    "b": "-...",
    "c": "-.-.",
    "d": "-..",
    "e": ".",
    "f": "..-.",
    "g": "--.",
    "h": "....",
    "i": "..",
    "j": ".---",
    "k": "-.-",
    "l": ".-..",
    "m": "--",
    "n": "-.",
    "o": "---",
    "p": ".--.",
    "q": "--.-",
    "r": ".-.",
    "s": "...",
    "t": "-",
    "u": "..-",
    "v": "...-",
    "w": ".--",
    "x": "-..-",
    "y": "-.--",
    "z": "--..",
    ".": ".-.-.-",
    ",": "--..--",
    "?": "..--..",
    "!": "-.-.--",
    "-": "-....-",
    "/": "-..-.",
    "@": ".--.-.",
    "(": "-.--.",
    ")": "-.--.-"
}`;

/**
 * Converts morse JSON string to JavaScript object
 * @returns {Promise} - Resolves with morse object or rejects if empty
 */
function toJs() {
    return new Promise((resolve, reject) => {
        try {
            const morseObj = JSON.parse(morse);
            
            if (Object.keys(morseObj).length === 0) {
                reject("Error: Morse object is empty");
            } else {
                resolve(morseObj);
            }
        } catch (error) {
            reject(`Error parsing JSON: ${error.message}`);
        }
    });
}

/**
 * Translates user input to morse code
 * @param {Object} morseJS - Morse code JavaScript object
 * @param {string} userInput - Word or sentence to translate
 * @returns {Promise} - Resolves with morse translation array or rejects on invalid characters
 */
function toMorse(morseJS, userInput) {
    return new Promise((resolve, reject) => {
        const input = userInput.toLowerCase().trim();
        
        if (!input) {
            reject("Error: Please enter a word or sentence");
            return;
        }

        const characters = input.split('');
        const morseTranslation = [];
        
        for (let char of characters) {
            if (char === ' ') {
                morseTranslation.push('/'); // Use slash to represent space
            } else if (morseJS[char]) {
                morseTranslation.push(morseJS[char]);
            } else {
                reject(`Error: Character "${char}" not found in morse dictionary`);
                return;
            }
        }
        
        resolve(morseTranslation);
    });
}

/**
 * Displays morse translation in console
 * @param {Array} morseTranslation - Array of morse code symbols
 */
function joinWords(morseTranslation) {
    console.log("\nMorse Code Translation:");
    console.log("======================");
    morseTranslation.forEach((code, index) => {
        console.log(`${code}`);
    });
    console.log("======================");
}

/**
 * Main function to chain all three morse functions
 * @param {string} text - Text to translate to morse code
 */
function translateToMorse(text) {
    console.log(`\nTranslating: "${text}"`);
    
    toJs()
        .then(morseObj => toMorse(morseObj, text))
        .then(morseTranslation => joinWords(morseTranslation))
        .catch(error => {
            console.log("Translation Error:", error);
        });
}

// Test the second challenge
console.log("\n\n=== 2nd Daily Challenge: Morse Code Translator ===");

// Test with valid words
setTimeout(() => translateToMorse("hello"), 100);
setTimeout(() => translateToMorse("sos"), 2000);
setTimeout(() => translateToMorse("good morning"), 4000);

// Test with invalid character
setTimeout(() => translateToMorse("hello!"), 6000);

// Test with empty input
setTimeout(() => translateToMorse(""), 8000);

// Test with numbers and special characters
setTimeout(() => translateToMorse("hello123"), 10000);

// Async/await version for cleaner code
async function translateToMorseAsync(text) {
    try {
        console.log(`\n[Async] Translating: "${text}"`);
        const morseObj = await toJs();
        const morseTranslation = await toMorse(morseObj, text);
        joinWords(morseTranslation);
    } catch (error) {
        console.log("[Async] Translation Error:", error);
    }
}

// Test async version
setTimeout(() => {
    console.log("\n\n=== Async/Await Version ===");
    translateToMorseAsync("javascript");
    setTimeout(() => translateToMorseAsync("web development"), 2000);
}, 12000);