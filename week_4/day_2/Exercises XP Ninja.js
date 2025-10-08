// Exercise 1 : Dog age to Human years
console.log("=== Exercise 1: Dog age to Human years ===");

const data = [
  {
    name: 'Butters',
    age: 3,
    type: 'dog'
  },
   {
    name: 'Cuty',
    age: 5,
    type: 'rabbit'
  },
  {
    name: 'Lizzy',
    age: 6,
    type: 'dog'
  },
  {
    name: 'Red',
    age: 1,
    type: 'cat'
  },
  {
    name: 'Joey',
    age: 3,
    type: 'dog'
  },
  {
    name: 'Rex',
    age: 10,
    type: 'dog'
  },
];

// Using a loop
let sumLoop = 0;
for (let i = 0; i < data.length; i++) {
  if (data[i].type === 'dog') {
    sumLoop += data[i].age * 7;
  }
}
console.log("Using loop - Sum of dogs' ages in human years:", sumLoop);

// Using reduce() method
const sumReduce = data.reduce((total, animal) => {
  if (animal.type === 'dog') {
    return total + (animal.age * 7);
  }
  return total;
}, 0);
console.log("Using reduce() - Sum of dogs' ages in human years:", sumReduce);

// Exercise 2 : Email
console.log("\n=== Exercise 2: Email ===");

const userEmail3 = ' cannotfillemailformcorrectly@gmail.com ';
const cleanEmail = userEmail3.trim();
console.log("Original email:", `"${userEmail3}"`);
console.log("Cleaned email:", `"${cleanEmail}"`);

// One line solution
const cleanEmailOneLine = userEmail3.trim();
console.log("One line solution:", `"${cleanEmailOneLine}"`);

// Exercise 3 : Employees #3
console.log("\n=== Exercise 3: Employees #3 ===");

const users = [
  { firstName: 'Bradley', lastName: 'Bouley', role: 'Full Stack Resident' },
  { firstName: 'Chloe', lastName: 'Alnaji', role: 'Full Stack Resident' },
  { firstName: 'Jonathan', lastName: 'Baughn', role: 'Enterprise Instructor' },
  { firstName: 'Michael', lastName: 'Herman', role: 'Lead Instructor' },
  { firstName: 'Robert', lastName: 'Hajek', role: 'Full Stack Resident' },
  { firstName: 'Wes', lastName: 'Reid', role: 'Instructor'},
  { firstName: 'Zach', lastName: 'Klabunde', role: 'Instructor'}
];

// Change structure: full name as key, role as value
const usersObject = {};
users.forEach(user => {
  const fullName = `${user.firstName} ${user.lastName}`;
  usersObject[fullName] = user.role;
});

console.log("Users as object with full name keys:");
console.log(usersObject);

// Exercise 4 : Array to Object
console.log("\n=== Exercise 4: Array to Object ===");

const letters = ['x', 'y', 'z', 'z'];

// Using for loop
const letterCountLoop = {};
for (let i = 0; i < letters.length; i++) {
  const letter = letters[i];
  if (letterCountLoop[letter]) {
    letterCountLoop[letter]++;
  } else {
    letterCountLoop[letter] = 1;
  }
}
console.log("Using for loop:", letterCountLoop);

// Using reduce() method
const letterCountReduce = letters.reduce((acc, letter) => {
  acc[letter] = (acc[letter] || 0) + 1;
  return acc;
}, {});
console.log("Using reduce():", letterCountReduce);

