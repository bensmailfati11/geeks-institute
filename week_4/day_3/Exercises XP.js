// 🌟 Exercise 1 : Location
console.log("=== Exercise 1: Location ===");

const person = {
    name: 'John Doe',
    age: 25,
    location: {
        country: 'Canada',
        city: 'Vancouver',
        coordinates: [49.2827, -123.1207]
    }
}

const {name, location: {country, city, coordinates: [lat, lng]}} = person;

console.log(`I am ${name} from ${city}, ${country}. Latitude(${lat}), Longitude(${lng})`);
console.log("Prediction: I am John Doe from Vancouver, Canada. Latitude(49.2827), Longitude(-123.1207)");

// 🌟 Exercise 2: Display Student Info
console.log("\n=== Exercise 2: Display Student Info ===");

function displayStudentInfo(objUser){
    const {first, last} = objUser;
    return `Your full name is ${first} ${last}`;
}

console.log(displayStudentInfo({first: 'Elie', last:'Schoppik'}));

// 🌟 Exercise 3: User & id
console.log("\n=== Exercise 3: User & id ===");

const users = { user1: 18273, user2: 92833, user3: 90315 };

// Part 1: Turn object into array
const usersArray = Object.entries(users);
console.log("1. Object to array:");
console.log(usersArray);

// Part 2: Multiply ID by 2
const usersArrayMultiplied = usersArray.map(([user, id]) => [user, id * 2]);
console.log("2. IDs multiplied by 2:");
console.log(usersArrayMultiplied);

// Exercise 4 : Person class
console.log("\n=== Exercise 4: Person class ===");

class Person {
  constructor(name) {
    this.name = name;
  }
}

const member = new Person('John');
console.log("typeof member:", typeof member);
console.log("Prediction: 'object' (instances of classes are objects)");

// 🌟 Exercise 5 : Dog class
console.log("\n=== Exercise 5: Dog class ===");

class Dog {
  constructor(name) {
    this.name = name;
  }
}

// Analyze which constructor successfully extends Dog class
console.log("Option 2 will successfully extend the Dog class because:");
console.log("- It calls super(name) to invoke the parent constructor");
console.log("- It properly passes the name parameter to super()");
console.log("- It correctly initializes the size property");

// Correct implementation
class Labrador extends Dog {
  constructor(name, size) {
    super(name);
    this.size = size;
  }
}

const myLab = new Labrador('Max', 'large');
console.log("Successful Labrador instance:", myLab);

// 🌟 Exercise 6 : Challenges
console.log("\n=== Exercise 6: Challenges ===");

// Part 1: Evaluate these
console.log("[2] === [2]:", [2] === [2]);
console.log("{} === {}:", {} === {});
console.log("Explanation: Both are false because arrays/objects are compared by reference, not value");

// Part 2: Object property values
console.log("\nObject property values:");
const object1 = { number: 5 }; 
const object2 = object1; 
const object3 = object2; 
const object4 = { number: 5};

object1.number = 4;
console.log("object2.number:", object2.number); // 4 (same reference)
console.log("object3.number:", object3.number); // 4 (same reference)
console.log("object4.number:", object4.number); // 5 (different object)

// Part 3: Animal and Mammal classes
console.log("\n=== Animal and Mammal Classes ===");

class Animal {
  constructor(name, type, color) {
    this.name = name;
    this.type = type;
    this.color = color;
  }
}

class Mammal extends Animal {
  sound(soundMade) {
    return `${soundMade} I'm a ${this.type}, named ${this.name} and I'm ${this.color}`;
  }
}

// Create farmerCow object
const farmerCow = new Mammal('Lily', 'cow', 'brown and white');
console.log(farmerCow.sound("Moooo"));

// Additional examples
const farmerDog = new Mammal('Buddy', 'dog', 'golden');
console.log(farmerDog.sound("Woof woof"));

