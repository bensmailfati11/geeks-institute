console.log("🌟 STAR PATTERN CHALLENGE 🌟");

console.log("\n=== Method 1: Using One Loop ===");
let pattern = "";
for (let i = 1; i <= 6; i++) {
    pattern += "* ";
    console.log(pattern);
}

console.log("\n=== Method 2: Using Nested Loops ===");
for (let row = 1; row <= 6; row++) {
    let line = "";
    for (let star = 1; star <= row; star++) {
        line += "* ";
    }
    console.log(line);
}

console.log("\n=== Bonus: Step-by-Step Explanation ===");
console.log("Method 1: Builds pattern by adding one star each line");
console.log("Method 2: For each row, adds exactly 'row' number of stars");

console.log("\n🎯 Challenge Completed!");