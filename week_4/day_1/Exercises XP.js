// 🌟 Exercise 1 : Scope
console.log("=== Exercise 1: Scope ===");

// #1
function funcOne() {
    let a = 5;
    if(a > 1) {
        a = 3;
    }
    console.log(`inside the funcOne function ${a}`);
}

// #2
let a = 0;
function funcTwo() {
    a = 5;
}

function funcThree() {
    console.log(`inside the funcThree function ${a}`);
}

// #3
function funcFour() {
    window.a = "hello";
}

function funcFive() {
    console.log(`inside the funcFive function ${a}`);
}

// #4
let a4 = 1;
function funcSix() {
    let a4 = "test";
    console.log(`inside the funcSix function ${a4}`);
}

// #5
let a5 = 2;
if (true) {
    let a5 = 5;
    console.log(`in the if block ${a5}`);
}
console.log(`outside of the if block ${a5}`);

// Run Exercise 1
funcOne();
console.log("--- Global scope example ---");
funcThree();
funcTwo();
funcThree();
console.log("--- Window property example ---");
funcFour();
funcFive();
console.log("--- Variable shadowing example ---");
funcSix();
console.log("--- Block scope example ---");

// 🌟 Exercise 2 : Ternary operator
console.log("\n=== Exercise 2: Ternary Operator ===");
const winBattle = () => true;
const experiencePoints = winBattle() ? 10 : 1;
console.log(`experiencePoints: ${experiencePoints}`);

// 🌟 Exercise 3 : Is it a string?
console.log("\n=== Exercise 3: Is it a string? ===");
const isString = (value) => typeof value === 'string';
console.log(`isString('hello'): ${isString('hello')}`);
console.log(`isString([1, 2, 4, 0]): ${isString([1, 2, 4, 0])}`);

// 🌟 Exercise 4 : Find the sum
console.log("\n=== Exercise 4: Find the sum ===");
const sum = (num1, num2) => num1 + num2;
console.log(`sum(5, 3): ${sum(5, 3)}`);
console.log(`sum(10, 20): ${sum(10, 20)}`);

// 🌟 Exercise 5 : Kg and grams
console.log("\n=== Exercise 5: Kg and grams ===");
function kgToGramsDeclaration(kg) {
    return kg * 1000;
}
const kgToGramsExpression = function(kg) {
    return kg * 1000;
};
const kgToGramsArrow = kg => kg * 1000;

console.log(`Function declaration (2kg): ${kgToGramsDeclaration(2)} grams`);
console.log(`Function expression (3kg): ${kgToGramsExpression(3)} grams`);
console.log(`Arrow function (1.5kg): ${kgToGramsArrow(1.5)} grams`);

// 🌟 Exercise 6 : Fortune teller
console.log("\n=== Exercise 6: Fortune teller ===");
(function(children, partner, location, job) {
    const fortune = `You will be a ${job} in ${location}, and married to ${partner} with ${children} kids.`;
    console.log(fortune);
})(2, "Sarah", "Paris", "Web Developer");

// 🌟 Exercise 7 : Welcome
console.log("\n=== Exercise 7: Welcome ===");
(function(userName) {
    console.log(`Welcome, ${userName}!`);
    // In real DOM: document.getElementById('navbar').innerHTML += `<div>Welcome ${userName}</div>`;
})("John");

// 🌟 Exercise 8 : Juice Bar
console.log("\n=== Exercise 8: Juice Bar ===");

// Part I
function makeJuice(size) {
    function addIngredients(ing1, ing2, ing3) {
        console.log(`The client wants a ${size} juice, containing ${ing1}, ${ing2}, ${ing3}`);
    }
    addIngredients('apple', 'orange', 'carrot');
}
console.log("--- Part I: Basic Juice ---");
makeJuice('large');

// Part II
function makeJuiceEnhanced(size) {
    const ingredients = [];
    
    function addIngredients(ing1, ing2, ing3) {
        ingredients.push(ing1, ing2, ing3);
    }
    
    function displayJuice() {
        console.log(`The client wants a ${size} juice, containing ${ingredients.join(', ')}`);
    }
    
    addIngredients('apple', 'orange', 'carrot');
    addIngredients('ginger', 'spinach', 'lemon');
    displayJuice();
}
console.log("--- Part II: Custom Juice ---");
makeJuiceEnhanced('medium');