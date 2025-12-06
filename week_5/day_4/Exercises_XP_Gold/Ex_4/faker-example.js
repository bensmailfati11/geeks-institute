// faker-example.js
const { faker } = require("@faker-js/faker");

const users = [];

function addFakeUser() {
  const user = {
    name: faker.person.fullName(),
    street: faker.location.streetAddress(),
    country: faker.location.country(),
  };
  users.push(user);
}

for (let i = 0; i < 5; i++) {
  addFakeUser();
}

console.log("Fake Users:", users);

// Bonus :

const prompt = require("prompt-sync")();


const usersP = [];

function addUser() {
  const name = prompt("Enter your name: ");
  const street = prompt("Enter your street: ");
  const country = prompt("Enter your country: ");
  usersP.push({ name, street, country });
}

addUser();
console.log(usersP);



