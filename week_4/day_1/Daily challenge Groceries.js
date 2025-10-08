// 🌟 Daily Challenge: Groceries

console.log("=== Daily Challenge: Groceries ===");

let client = "John";

const groceries = {
    fruits : ["pear", "apple", "banana"],
    vegetables: ["tomatoes", "cucumber", "salad"],
    totalPrice : "20$",
    other : {
        paid : true,
        meansOfPayment : ["cash", "creditCard"]
    }
}

// Arrow function to display fruits
const displayGroceries = () => {
    console.log("Fruits from groceries:");
    groceries.fruits.forEach(fruit => {
        console.log(fruit);
    });
}

// Arrow function to clone groceries
const cloneGroceries = () => {
    // Copy client variable
    let user = client;
    console.log("\n1. After copying client to user:");
    console.log("client =", client);
    console.log("user =", user);
    
    // Change client variable
    client = "Betty";
    console.log("\n2. After changing client to 'Betty':");
    console.log("client =", client);
    console.log("user =", user);
    console.log("❓ Will user change? NO - because strings are passed by value (primitive type)");
    
    // Copy groceries object
    let shopping = groceries;
    console.log("\n3. After copying groceries to shopping:");
    console.log("Original totalPrice:", groceries.totalPrice);
    console.log("Shopping totalPrice:", shopping.totalPrice);
    
    // Change totalPrice in shopping
    shopping.totalPrice = "35$";
    console.log("\n4. After changing shopping.totalPrice to '35$':");
    console.log("Original totalPrice:", groceries.totalPrice);
    console.log("Shopping totalPrice:", shopping.totalPrice);
    console.log("❓ Will groceries.totalPrice change? YES - because objects are passed by reference");
    
    // Change paid in shopping
    shopping.other.paid = false;
    console.log("\n5. After changing shopping.other.paid to false:");
    console.log("Original paid:", groceries.other.paid);
    console.log("Shopping paid:", shopping.other.paid);
    console.log("❓ Will groceries.other.paid change? YES - because nested objects are also passed by reference");
}

// Invoke functions
displayGroceries();
cloneGroceries();

