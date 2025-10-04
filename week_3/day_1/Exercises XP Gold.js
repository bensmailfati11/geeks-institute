// Exercise 1: Divisible by three
console.log("=== Exercise 1 ===");
let numbers = [123, 8409, 100053, 333333333, 7];

for (let i = 0; i < numbers.length; i++) {
    let result = numbers[i] % 3 === 0;
    console.log(numbers[i] + " divisible by 3? " + result);
}

// Exercise 2: Attendance
console.log("\n=== Exercise 2 ===");
let guestList = {
    randy: "Germany",
    karla: "France",
    wendy: "Japan",
    norman: "England",
    sam: "Argentina"
};

// Test with sample names
let testNames = ["randy", "john", "karla"];

for (let name of testNames) {
    if (name in guestList) {
        console.log("Hi! I'm " + name + ", and I'm from " + guestList[name]);
    } else {
        console.log("Hi! I'm a guest.");
    }
}

// Exercise 3: Playing with numbers
console.log("\n=== Exercise 3 ===");
let age = [20, 5, 12, 43, 98, 55];

// Sum calculation
let sum = 0;
for (let i = 0; i < age.length; i++) {
    sum += age[i];
}
console.log("Sum of ages: " + sum);

// Highest age
let highest = age[0];
for (let i = 1; i < age.length; i++) {
    if (age[i] > highest) {
        highest = age[i];
    }
}
console.log("Highest age: " + highest);
