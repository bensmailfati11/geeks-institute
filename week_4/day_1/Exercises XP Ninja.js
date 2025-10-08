// 🌟 Exercise 1 : Merge Words

console.log("=== Exercise 1: Merge Words ===");

// Currying version of mergeWords
const mergeWords = (string) => (nextString) => {
  if (nextString === undefined) {
    return string;
  } else {
    return mergeWords(string + ' ' + nextString);
  }
}

// Test cases
console.log("mergeWords('Hello')():", mergeWords('Hello')());
console.log("mergeWords('There')('is')('no')('spoon.')():", mergeWords('There')('is')('no')('spoon.')());
console.log("mergeWords('I')('love')('JavaScript!')():", mergeWords('I')('love')('JavaScript!')());

// Additional test cases
console.log("mergeWords('Currying')('is')('awesome')():", mergeWords('Currying')('is')('awesome')());
console.log("mergeWords('Single')('word')():", mergeWords('Single')('word')());

