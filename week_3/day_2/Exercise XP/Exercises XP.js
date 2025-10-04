// Exercise 1: Find numbers divisible by 23
console.log("=== Exercise 1: Numbers Divisible by 23 ===");

function displayNumbersDivisible(divisor = 23) {
    let numbers = [];
    let sum = 0;
    
    for (let i = 0; i <= 500; i++) {
        if (i % divisor === 0) {
            numbers.push(i);
            sum += i;
        }
    }
    
    console.log("Numbers divisible by " + divisor + ": " + numbers.join(" "));
    console.log("Sum: " + sum);
    return sum;
}

// Test
displayNumbersDivisible();
console.log("\n--- Bonus Tests ---");
displayNumbersDivisible(3);
displayNumbersDivisible(45);

// Exercise 2: Shopping List
console.log("\n=== Exercise 2: Shopping List ===");

const stock = { 
    "banana": 6, 
    "apple": 0,
    "pear": 12,
    "orange": 32,
    "blueberry": 1
};  

const prices = {    
    "banana": 4, 
    "apple": 2, 
    "pear": 1,
    "orange": 1.5,
    "blueberry": 10
};

function myBill() {
    const shoppingList = ["banana", "orange", "apple"];
    let total = 0;
    
    for (let item of shoppingList) {
        if (item in stock && stock[item] > 0) {
            total += prices[item];
            // Bonus: decrease stock
            stock[item]--;
            console.log("Added " + item + ": $" + prices[item]);
        } else {
            console.log(item + " is out of stock");
        }
    }
    
    console.log("Total bill: $" + total);
    return total;
}

// Test
console.log("Stock before:", stock);
myBill();
console.log("Stock after:", stock);

// Exercise 3: What's in my wallet
console.log("\n=== Exercise 3: What's in my wallet? ===");

function changeEnough(itemPrice, amountOfChange) {
    const quarters = amountOfChange[0] * 0.25;
    const dimes = amountOfChange[1] * 0.10;
    const nickels = amountOfChange[2] * 0.05;
    const pennies = amountOfChange[3] * 0.01;
    
    const totalChange = quarters + dimes + nickels + pennies;
    console.log(`Item price: $${itemPrice}, Total change: $${totalChange.toFixed(2)}`);
    
    return totalChange >= itemPrice;
}

// Tests
console.log("changeEnough(4.25, [25, 20, 5, 0]):", changeEnough(4.25, [25, 20, 5, 0]));
console.log("changeEnough(14.11, [2, 100, 0, 0]):", changeEnough(14.11, [2, 100, 0, 0]));
console.log("changeEnough(0.75, [0, 0, 20, 5]):", changeEnough(0.75, [0, 0, 20, 5]));

// Exercise 4: Vacation Costs
console.log("\n=== Exercise 4: Vacation Costs ===");

function hotelCost() {
    let nights;
    do {
        nights = prompt("How many nights would you like to stay at the hotel?");
    } while (!nights || isNaN(nights));
    
    return nights * 140;
}

function planeRideCost() {
    let destination;
    do {
        destination = prompt("What is your destination?");
    } while (!destination || typeof destination !== "string");
    
    const prices = {
        "london": 183,
        "paris": 220
    };
    
    return prices[destination.toLowerCase()] || 300;
}

function rentalCarCost() {
    let days;
    do {
        days = prompt("How many days would you like to rent the car?");
    } while (!days || isNaN(days));
    
    let cost = days * 40;
    if (days > 10) {
        cost *= 0.95; // 5% discount
    }
    
    return cost;
}

function totalVacationCost() {
    const hotel = hotelCost();
    const plane = planeRideCost();
    const car = rentalCarCost();
    const total = hotel + plane + car;
    
    console.log(`Hotel cost: $${hotel}`);
    console.log(`Plane cost: $${plane}`);
    console.log(`Car rental: $${car}`);
    console.log(`Total vacation cost: $${total}`);
    
    return total;
}

// Uncomment to test (commented to avoid prompt spam)
// console.log("Total vacation cost:", totalVacationCost());

console.log("Exercise 4 functions are defined. Uncomment the test line to run interactively.");

// Exercise 5: Users (DOM Manipulation)
console.log("\n=== Exercise 5: Users ===");

function exercise5() {
    // Retrieve the div and console.log it
    const container = document.getElementById("container");
    console.log("Container div:", container);
    
    // Change "Pete" to "Richard"
    const lists = document.querySelectorAll(".list");
    lists[0].children[1].textContent = "Richard";
    
    // Delete the second <li> of the second <ul>
    lists[1].children[1].remove();
    
    // Change first <li> of each <ul> to your name
    lists.forEach(list => {
        list.children[0].textContent = "Alex";
    });
    
    // Add classes
    lists.forEach(list => {
        list.classList.add("student_list");
    });
    lists[0].classList.add("university", "attendance");
    
    // Styling
    container.style.backgroundColor = "lightblue";
    container.style.padding = "10px";
    
    // Hide "Dan"
    lists[0].children[lists[0].children.length - 1].style.display = "none";
    
    // Border for Richard
    lists[0].children[1].style.border = "2px solid black";
    
    // Change body font size
    document.body.style.fontSize = "18px";
    
    // Bonus alert
    if (container.style.backgroundColor === "lightblue") {
        const users = Array.from(lists[0].children).map(li => li.textContent).filter(name => name !== "Dan");
        alert(`Hello ${users.join(" and ")}`);
    }
}

console.log("Exercise 5 DOM functions are ready. Make sure HTML is loaded.");

// Exercise 6: Change the navbar
console.log("\n=== Exercise 6: Change the navbar ===");

function exercise6() {
    // Change id attribute
    const navBar = document.getElementById("navBar");
    navBar.setAttribute("id", "socialNetworkNavigation");
    
    // Add new li with Logout
    const ul = navBar.querySelector("ul");
    const newLi = document.createElement("li");
    const logoutText = document.createTextNode("Logout");
    newLi.appendChild(logoutText);
    ul.appendChild(newLi);
    
    // Get first and last li
    const firstLi = ul.firstElementChild;
    const lastLi = ul.lastElementChild;
    
    console.log("First link:", firstLi.textContent);
    console.log("Last link:", lastLi.textContent);
}

console.log("Exercise 6 DOM functions are ready. Make sure HTML is loaded.");

// Exercise 7: My Book List
console.log("\n=== Exercise 7: My Book List ===");

function exercise7() {
    const allBooks = [
        {
            title: "The Hobbit",
            author: "J.R.R. Tolkien",
            image: "https://images-na.ssl-images-amazon.com/images/I/51uLvJlKpNL._SX321_BO1,204,203,200_.jpg",
            alreadyRead: true
        },
        {
            title: "Harry Potter",
            author: "J.K. Rowling", 
            image: "https://images-na.ssl-images-amazon.com/images/I/51DF6ZR8G7L._SX329_BO1,204,203,200_.jpg",
            alreadyRead: false
        }
    ];
    
    const bookSection = document.querySelector(".listBooks");
    
    allBooks.forEach(book => {
        const bookDiv = document.createElement("div");
        bookDiv.className = "book";
        
        const bookInfo = document.createElement("p");
        bookInfo.textContent = `${book.title} written by ${book.author}`;
        
        if (book.alreadyRead) {
            bookInfo.style.color = "red";
        }
        
        const bookImage = document.createElement("img");
        bookImage.src = book.image;
        bookImage.alt = book.title;
        bookImage.style.width = "100px";
        
        bookDiv.appendChild(bookInfo);
        bookDiv.appendChild(bookImage);
        bookSection.appendChild(bookDiv);
    });
}


