// 🌟 Exercise 1 : Colors
console.log("=== Exercise 1: Colors ===");

const colors = ["Blue", "Green", "Red", "Orange", "Violet", "Indigo", "Yellow"];

// Display colors with numbering
colors.forEach((color, index) => {
    console.log(`${index + 1}# choice is ${color}.`);
});

// Check if array contains "Violet"
console.log(colors.includes("Violet") ? "Yeah" : "No...");

// 🌟 Exercise 2 : Colors #2
console.log("\n=== Exercise 2: Colors #2 ===");

const ordinal = ["th", "st", "nd", "rd"];

colors.forEach((color, index) => {
    const position = index + 1;
    const suffix = position <= 3 ? ordinal[position] : ordinal[0];
    console.log(`${position}${suffix} choice is ${color}.`);
});

// Exercise 3 : Analyzing
console.log("\n=== Exercise 3: Analyzing ===");

console.log("------1------");
const fruits = ["apple", "orange"];
const vegetables = ["carrot", "potato"];
const result = ['bread', ...vegetables, 'chicken', ...fruits];
console.log("Prediction: ['bread', 'carrot', 'potato', 'chicken', 'apple', 'orange']");
console.log("Actual:", result);

console.log("------2------");
const country = "USA";
console.log("Prediction: ['U', 'S', 'A']");
console.log("Actual:", [...country]);

console.log("------Bonus------");
let newArray = [...[,,]];
console.log("Prediction: [undefined, undefined]");
console.log("Actual:", newArray);

// 🌟 Exercise 4 : Employees
console.log("\n=== Exercise 4: Employees ===");

const users = [
    { firstName: 'Bradley', lastName: 'Bouley', role: 'Full Stack Resident' },
    { firstName: 'Chloe', lastName: 'Alnaji', role: 'Full Stack Resident' },
    { firstName: 'Jonathan', lastName: 'Baughn', role: 'Enterprise Instructor' },
    { firstName: 'Michael', lastName: 'Herman', role: 'Lead Instructor' },
    { firstName: 'Robert', lastName: 'Hajek', role: 'Full Stack Resident' },
    { firstName: 'Wes', lastName: 'Reid', role: 'Instructor'},
    { firstName: 'Zach', lastName: 'Klabunde', role: 'Instructor'}
];

// 1. Welcome messages using map()
const welcomeStudents = users.map(user => `Hello ${user.firstName}`);
console.log("1. Welcome messages:");
console.log(welcomeStudents);

// 2. Filter only Full Stack Residents
const fullStackResidents = users.filter(user => user.role === 'Full Stack Resident');
console.log("\n2. Full Stack Residents:");
console.log(fullStackResidents);

// 3. Bonus: Last names of Full Stack Residents
const fullStackLastNames = users
    .filter(user => user.role === 'Full Stack Resident')
    .map(user => user.lastName);
console.log("\n3. Last names of Full Stack Residents:");
console.log(fullStackLastNames);

// 🌟 Exercise 5 : Star Wars
console.log("\n=== Exercise 5: Star Wars ===");

const epic = ['a', 'long', 'time', 'ago', 'in a', 'galaxy', 'far far', 'away'];
const starWarsSentence = epic.reduce((accumulator, currentWord) => {
    return accumulator + ' ' + currentWord;
});
console.log("Star Wars sentence:", starWarsSentence);

// 🌟 Exercise 6 : Employees #2
console.log("\n=== Exercise 6: Employees #2 ===");

const students = [
    {name: "Ray", course: "Computer Science", isPassed: true}, 
    {name: "Liam", course: "Computer Science", isPassed: false}, 
    {name: "Jenner", course: "Information Technology", isPassed: true}, 
    {name: "Marco", course: "Robotics", isPassed: true}, 
    {name: "Kimberly", course: "Artificial Intelligence", isPassed: false}, 
    {name: "Jamie", course: "Big Data", isPassed: false}
];

// Students who passed the course
const passedStudents = students.filter(student => student.isPassed);
console.log("Students who passed:");
console.log(passedStudents);

// Bonus: Congratulate students who passed
console.log("\nBonus - Congratulations:");
students
    .filter(student => student.isPassed)
    .forEach(student => {
        console.log(`Good job ${student.name}, you passed the course in ${student.course}`);
    });
