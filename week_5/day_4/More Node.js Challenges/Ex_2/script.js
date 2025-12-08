// Exercise 2: Display minutes lived since birthdate
const minutesLived = require('./date.js');

// Hardcoded birthdate (example: January 15, 1990)
const birthdate = '1990-01-15';

const minutes = minutesLived(birthdate);
console.log(`You have lived ${minutes.toLocaleString()} minutes in your life.`);

// Bonus: Using prompt-sync to ask user for birthdate
// First install: npm install prompt-sync
// Uncomment the code below to use it:

/*
const prompt = require('prompt-sync')();

console.log('\nBonus: Enter your birthdate');
const userBirthdate = prompt('Enter your birthdate (YYYY-MM-DD): ');

const userMinutes = minutesLived(userBirthdate);
console.log(`\nYou have lived ${userMinutes.toLocaleString()} minutes in your life.`);
*/
