// app.js
const _ = require("lodash");
const math = require("./math");

console.log(" Sum:", math.add(5, 10));
console.log("Multiply:", math.multiply(4, 6));

const numbers = [10, 20, 30, 40];
console.log("Average:", _.mean(numbers));