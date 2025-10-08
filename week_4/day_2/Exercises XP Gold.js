// Exercise 1 : Analyzing the map method
console.log("=== Exercise 1: Analyzing the map method ===");
console.log("Prediction: [2, 4, 6]");
const result1 = [1, 2, 3].map(num => {
  if (typeof num === 'number') return num * 2;
  return ;
});
console.log("Actual:", result1);
console.log("Explanation: Each number is multiplied by 2");

// Exercise 2: Analyzing the reduce method
console.log("\n=== Exercise 2: Analyzing the reduce method ===");
console.log("Prediction: [1, 2, 0, 1, 2, 3]");
const result2 = [[0, 1], [2, 3]].reduce(
  (acc, cur) => {
    return acc.concat(cur);
  },
  [1, 2],
);
console.log("Actual:", result2);
console.log("Explanation: Starts with [1,2], then concatenates [0,1] -> [1,2,0,1], then [2,3] -> [1,2,0,1,2,3]");

// Exercise 3 : Analyze this code
console.log("\n=== Exercise 3: Analyze this code ===");
console.log("Prediction: i represents the index of each element (0, 1, 2, 3, 4, 5)");
const arrayNum = [1, 2, 4, 5, 8, 9];
const newArray = arrayNum.map((num, i) => {
    console.log(`num: ${num}, i: ${i}`);
    return num * 2;
});
console.log("Final newArray:", newArray);
console.log("Explanation: i is the index parameter in map callback");

// Exercise 4 : Nested arrays
console.log("\n=== Exercise 4: Nested arrays ===");

// Part 1
const array = [[1],[2],[3],[[[4]]],[[[5]]]];
console.log("Original array:", JSON.stringify(array));

const modifiedArray = array.flat(2);
console.log("Modified array (one line):", JSON.stringify(modifiedArray));
console.log("Using array.flat(2) to flatten 2 levels deep");

// Part 2
const greeting = [["Hello", "young", "grasshopper!"], ["you", "are"], ["learning", "fast!"]];
console.log("\nOriginal greeting:", JSON.stringify(greeting));

const flattenedGreeting = greeting.map(subArray => subArray.join(" "));
console.log("Flattened greeting:", flattenedGreeting);

// Part 3 - Turn into string
const greetingString = flattenedGreeting.join(" ");
console.log("Greeting as string:", greetingString);

// Part 4 - Trapped number
const trapped = [[[[[[[[[[[[[[[[[[[[[[[[[[3]]]]]]]]]]]]]]]]]]]]]]]]]];
console.log("\nOriginal trapped:", JSON.stringify(trapped).slice(0, 50) + "...");

const freed = trapped.flat(Infinity);
console.log("Freed number:", freed);
console.log("Using array.flat(Infinity) to flatten all levels");

