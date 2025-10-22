// 🌟 Exercise 1 : Comparison
function compareToTen(num) {
    return new Promise((resolve, reject) => {
        if (num <= 10) {
            resolve(`${num} is less than or equal to 10`);
        } else {
            reject(`${num} is greater than 10`);
        }
    });
}

// 🌟 Exercise 2 : Promises
function createDelayPromise() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("success");
        }, 4000);
    });
}

// 🌟 Exercise 3 : Resolve & Reject
const resolvedPromise = Promise.resolve(3);
const rejectedPromise = Promise.reject("Boo!");

// Test all exercises
console.log("=== Exercise 1 Tests ===");

// Test case 1: Should reject
compareToTen(15)
    .then(result => console.log(result))
    .catch(error => console.log("Error:", error));

// Test case 2: Should resolve
compareToTen(8)
    .then(result => console.log(result))
    .catch(error => console.log("Error:", error));

console.log("\n=== Exercise 2 Test ===");
console.log("Starting 4-second delay...");
createDelayPromise()
    .then(result => {
        console.log("Exercise 2 Result:", result);
    })
    .catch(error => {
        console.log("Exercise 2 Error:", error);
    });

console.log("\n=== Exercise 3 Tests ===");

// Test resolved promise
resolvedPromise
    .then(value => {
        console.log("Resolved promise value:", value);
    })
    .catch(error => {
        console.log("Resolved promise error:", error);
    });

// Test rejected promise
rejectedPromise
    .then(value => {
        console.log("Rejected promise value:", value);
    })
    .catch(error => {
        console.log("Rejected promise error:", error);
    });

// Additional demonstration of async/await for better readability
async function runAllTests() {
    console.log("\n=== Async/Await Tests ===");
    
    try {
        // Exercise 1
        const result1 = await compareToTen(5);
        console.log("Async Test 1:", result1);
        
        // Exercise 2
        console.log("Starting async 4-second delay...");
        const result2 = await createDelayPromise();
        console.log("Async Test 2:", result2);
        
        // Exercise 3
        const result3 = await resolvedPromise;
        console.log("Async Test 3:", result3);
        
    } catch (error) {
        console.log("Async Test Error:", error);
    }
}

// Run async tests after a brief delay to let other tests complete first
setTimeout(() => {
    runAllTests();
}, 100);