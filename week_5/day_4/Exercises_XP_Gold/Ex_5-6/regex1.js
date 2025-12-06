// Exercese 5:
// regex1.js
function returnNumbers(str) {
  const result = str.match(/\d+/g); 
  return result ? result.join("") : "";
}

console.log(returnNumbers("k5k3q2g5z6x9bn")); // 532569


// Exsercise 6:

const prompt = require("prompt-sync")();

const fullName = prompt("Enter your full name (e.g., John Doe): ");
const regex = /^[A-Z][a-z]+ [A-Z][a-z]+$/;

if (regex.test(fullName)) {
  console.log("Valid name format!");
} else {
  console.log("Invalid name format!");
}
