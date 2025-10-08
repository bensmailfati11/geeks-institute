// 🌟 Exercise 1 : Nested functions
console.log("=== Exercise 1: Nested Functions ===");

let landscape = function() {
 let result = "";
 let flat = function(x) {
   for(let count = 0; count<x; count++){
     result = result + "_";
   }
 }
 let mountain = function(x) {
   result = result + "/"
   for(let counter = 0; counter<x; counter++){
     result = result + "'"
   }
   result = result + "\\"
 }
 flat(4);
 mountain(4);
 flat(4)
 return result;
}

console.log("Original:", landscape());

// Changed to nested arrow functions
let landscapeArrow = () => {
 let result = "";
 let flat = (x) => {
   for(let count = 0; count<x; count++){
     result = result + "_";
   }
 }
 let mountain = (x) => {
   result = result + "/"
   for(let counter = 0; counter<x; counter++){
     result = result + "'"
   }
   result = result + "\\"
 }
 flat(4);
 mountain(4);
 flat(4)
 return result;
}

console.log("Arrow functions:", landscapeArrow());
console.log("Prediction: ____/''''\\\\____");

// 🌟 Exercise 2 : Closure
console.log("\n=== Exercise 2: Closure ===");
const addTo = x => y => x + y;
const addToTen = addTo(10);
console.log("addToTen(3):", addToTen(3));
console.log("Prediction: 13");

// 🌟 Exercise 3 : Currying
console.log("\n=== Exercise 3: Currying ===");
const curriedSum = (a) => (b) => a + b;
console.log("curriedSum(30)(1):", curriedSum(30)(1));
console.log("Prediction: 31");

// 🌟 Exercise 4 : Currying
console.log("\n=== Exercise 4: Currying ===");
const curriedSum2 = (a) => (b) => a + b;
const add5 = curriedSum2(5);
console.log("add5(12):", add5(12));
console.log("Prediction: 17");

// 🌟 Exercise 5 : Composing
console.log("\n=== Exercise 5: Composing ===");
const compose = (f, g) => (a) => f(g(a));
const add1 = (num) => num + 1;
const add5func = (num) => num + 5;
console.log("compose(add1, add5)(10):", compose(add1, add5func)(10));
console.log("Prediction: 16");

