// =============================================
// WORD FRAME CHALLENGE - COMPLETE SOLUTION
// =============================================

console.log("🌟 WORD FRAME MAKER 🌟");
console.log("======================");

function createWordFrame() {
    // Step 1: Prompt the user for words separated by commas
    const userInput = prompt("Enter several words separated by commas:\n\nExample: Hello, World, in, a, frame");
    
    // Check if user clicked cancel or entered nothing
    if (userInput === null) {
        console.log("🚫 Operation canceled by user.");
        return;
    }
    
    if (userInput.trim() === "") {
        console.log("❌ No words entered. Please try again.");
        return;
    }
    
    console.log(`📝 User input: "${userInput}"`);
    
    // Step 2: Put the words into an array
    const wordsArray = userInput.split(',')
        .map(word => word.trim())
        .filter(word => word.length > 0);
    
    console.log(`🔤 Words array: [${wordsArray.map(word => `"${word}"`).join(', ')}]`);
    console.log(`📊 Number of words: ${wordsArray.length}`);
    
    // Check if we have valid words after processing
    if (wordsArray.length === 0) {
        console.log("❌ No valid words found after processing.");
        return;
    }
    
    // Step 3: Find the length of the longest word
    let maxLength = 0;
    for (let i = 0; i < wordsArray.length; i++) {
        if (wordsArray[i].length > maxLength) {
            maxLength = wordsArray[i].length;
        }
    }
    console.log(`📏 Longest word length: ${maxLength} characters`);
    
    // Step 4: Create the rectangular frame
    console.log("\n🎯 FINAL RESULT:");
    console.log("=" .repeat(50));
    
    // Create top border (stars depend on longest word length)
    const border = '*'.repeat(maxLength + 4);
    console.log(border);
    
    // Display each word in the frame
    for (let i = 0; i < wordsArray.length; i++) {
        const word = wordsArray[i];
        const spacesNeeded = maxLength - word.length;
        const spaces = ' '.repeat(spacesNeeded);
        console.log(`* ${word}${spaces} *`);
    }
    
    // Create bottom border
    console.log(border);
    
    // Bonus: Display word statistics
    displayWordStats(wordsArray);
}

function displayWordStats(words) {
    console.log("\n📈 WORD STATISTICS:");
    console.log("-".repeat(30));
    
    let totalCharacters = 0;
    let longestWord = words[0];
    let shortestWord = words[0];
    
    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        totalCharacters += word.length;
        
        if (word.length > longestWord.length) {
            longestWord = word;
        }
        if (word.length < shortestWord.length) {
            shortestWord = word;
        }
    }
    
    const averageLength = (totalCharacters / words.length).toFixed(1);
    
    console.log(`📖 Total words: ${words.length}`);
    console.log(`🔤 Total characters: ${totalCharacters}`);
    console.log(`📐 Average word length: ${averageLength} characters`);
    console.log(`🏆 Longest word: "${longestWord}" (${longestWord.length} chars)`);
    console.log(`📏 Shortest word: "${shortestWord}" (${shortestWord.length} chars)`);
}

function runExamples() {
    console.log("\n🧪 TEST EXAMPLES:");
    console.log("=================");
    
    const examples = [
        ["Hello", "World", "in", "a", "frame"],
        ["JavaScript", "is", "awesome"],
        ["This", "is", "a", "test"],
        ["Single"],
        ["A", "longer", "example", "with", "different", "lengths"]
    ];
    
    for (let i = 0; i < examples.length; i++) {
        console.log(`\nExample ${i + 1}: [${examples[i].join(', ')}]`);
        createFrameForArray(examples[i]);
    }
}

function createFrameForArray(words) {
    // Find longest word length
    let maxLength = 0;
    for (let i = 0; i < words.length; i++) {
        if (words[i].length > maxLength) {
            maxLength = words[i].length;
        }
    }
    
    // Create and display frame
    const border = '*'.repeat(maxLength + 4);
    console.log(border);
    
    for (let i = 0; i < words.length; i++) {
        const spaces = ' '.repeat(maxLength - words[i].length);
        console.log(`* ${words[i]}${spaces} *`);
    }
    
    console.log(border);
}

// =============================================
// MAIN EXECUTION
// =============================================

console.log("🎯 CHALLENGE REQUIREMENTS:");
console.log("✓ Prompt user for comma-separated words");
console.log("✓ Convert input to array");
console.log("✓ Find longest word length");
console.log("✓ Display words in rectangular frame");
console.log("✓ Frame width depends on longest word");
console.log("✓ Pure JavaScript (no HTML/CSS)");
console.log("\n" + "=".repeat(50));

// Run test examples first
runExamples();

console.log("\n" + "=".repeat(50));
console.log("🎮 NOW IT'S YOUR TURN!");
console.log("=".repeat(50));

// Run the main function for user input
createWordFrame();

console.log("\n" + "=".repeat(50));
console.log("✅ CHALLENGE COMPLETED!");
console.log("🎉 All requirements successfully implemented!");
console.log("=".repeat(50));