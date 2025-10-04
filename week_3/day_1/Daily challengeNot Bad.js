console.log("=== String Manipulation Exercise ===");

// Function to process the sentence
function processSentence(sentence) {
    console.log("Original sentence: " + sentence);
    
    // Find the first appearance of "not"
    let wordNot = sentence.indexOf("not");
    console.log("Position of 'not': " + wordNot);
    
    // Find the first appearance of "bad" 
    let wordBad = sentence.indexOf("bad");
    console.log("Position of 'bad': " + wordBad);
    
    // Check if both words exist and "bad" comes after "not"
    if (wordNot !== -1 && wordBad !== -1 && wordBad > wordNot) {
        // Replace "not...bad" with "good"
        let beforeNot = sentence.substring(0, wordNot);
        let afterBad = sentence.substring(wordBad + 3); // +3 to skip "bad"
        let newSentence = beforeNot + "good" + afterBad;
        console.log("✅ Result: " + newSentence);
        return newSentence;
    } else {
        console.log("❌ No change needed: " + sentence);
        return sentence;
    }
}

// Test cases
console.log("\n--- Test 1 ---");
processSentence("The movie is not that bad, I like it");

console.log("\n--- Test 2 ---");
processSentence("This dinner is not that bad ! You cook well");

console.log("\n--- Test 3 ---");
processSentence("This movie is not so bad !");

console.log("\n--- Test 4 ---");
processSentence("This dinner is bad !");

console.log("\n--- Test 5 ---");
processSentence("This dinner is good !");

console.log("\n--- Test 6 ---");
processSentence("This is not good at all, it's actually bad!");