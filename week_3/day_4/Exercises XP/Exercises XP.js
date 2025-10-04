// =============================================
// EXERCISE XP - DOM MANIPULATION
// =============================================

console.log("🌟 Exercises XP - DOM Manipulation Started!");

// Exercise 1: Change the Article
function exercise1() {
    console.log("\n🎯 Exercise 1: Change the Article");
    
    // 1. Retrieve the h1 and console.log it
    const h1 = document.querySelector('h1');
    console.log("H1 element:", h1);
    console.log("H1 text:", h1.textContent);
    
    // 2. Remove the last paragraph
    const article = document.querySelector('article');
    const paragraphs = article.querySelectorAll('p');
    if (paragraphs.length > 0) {
        const lastParagraph = paragraphs[paragraphs.length - 1];
        lastParagraph.remove();
        console.log("Last paragraph removed");
    }
    
    // 3. Change h2 background to red when clicked
    const h2 = document.querySelector('h2');
    h2.addEventListener('click', function() {
        this.style.backgroundColor = 'red';
        console.log("H2 background changed to red");
    });
    
    // 4. Hide h3 when clicked
    const h3 = document.querySelector('h3');
    h3.addEventListener('click', function() {
        this.style.display = 'none';
        console.log("H3 hidden");
    });
    
    // 5. Make all paragraphs bold when button clicked
    const boldButton = document.getElementById('makeBoldBtn');
    boldButton.addEventListener('click', function() {
        const allParagraphs = document.querySelectorAll('p');
        allParagraphs.forEach(p => {
            p.classList.toggle('bold-text');
        });
        console.log("All paragraphs toggled bold");
    });
    
    // BONUS: Random font size on h1 hover
    h1.addEventListener('mouseover', function() {
        const randomSize = Math.floor(Math.random() * 101);
        this.style.fontSize = `${randomSize}px`;
        console.log(`H1 font size changed to ${randomSize}px`);
    });
    
    // BONUS: Fade out second paragraph on hover
    if (paragraphs.length >= 2) {
        const secondParagraph = paragraphs[1];
        secondParagraph.addEventListener('mouseover', function() {
            this.classList.add('fade-out');
            console.log("Second paragraph fading out");
        });
        
        secondParagraph.addEventListener('mouseout', function() {
            this.classList.remove('fade-out');
            console.log("Second paragraph restored");
        });
    }
}

// Exercise 2: Work with Forms
function exercise2() {
    console.log("\n🎯 Exercise 2: Work with Forms");
    
    // 1. Retrieve the form and console.log it
    const form = document.getElementById('userForm');
    console.log("Form element:", form);
    
    // 2. Retrieve inputs by id and console.log them
    const fnameInput = document.getElementById('fname');
    const lnameInput = document.getElementById('lname');
    console.log("First name input:", fnameInput);
    console.log("Last name input:", lnameInput);
    
    // 3. Retrieve inputs by name attribute and console.log them
    const inputsByName = document.querySelectorAll('input[name="firstname"], input[name="lastname"]');
    console.log("Inputs by name:", inputsByName);
    
    // 4. Form submit event listener
    form.addEventListener('submit', function(event) {
        // Prevent default form submission
        event.preventDefault();
        console.log("Form submission prevented");
        
        // Get input values
        const firstName = fnameInput.value.trim();
        const lastName = lnameInput.value.trim();
        
        console.log("First name:", firstName);
        console.log("Last name:", lastName);
        
        // Validate inputs
        if (!firstName || !lastName) {
            alert("Please fill in both fields!");
            return;
        }
        
        // Create list items
        const usersAnswerList = document.querySelector('.usersAnswer');
        usersAnswerList.innerHTML = ''; // Clear previous entries
        
        const firstNameLi = document.createElement('li');
        firstNameLi.textContent = firstName;
        
        const lastNameLi = document.createElement('li');
        lastNameLi.textContent = lastName;
        
        // Append to list
        usersAnswerList.appendChild(firstNameLi);
        usersAnswerList.appendChild(lastNameLi);
        
        console.log("User answers added to list");
        
        // Clear form
        form.reset();
    });
}

// Exercise 3: Transform the Sentence
let allBoldItems = [];

function exercise3() {
    console.log("\n🎯 Exercise 3: Transform the Sentence");
    
    // Function to get all bold items
    function getBoldItems() {
        const paragraph = document.getElementById('boldParagraph');
        allBoldItems = paragraph.querySelectorAll('strong');
        console.log("Bold items found:", allBoldItems.length);
        return allBoldItems;
    }
    
    // Function to highlight bold text in blue
    function highlight() {
        allBoldItems.forEach(item => {
            item.classList.add('highlight');
        });
        console.log("Bold items highlighted in blue");
    }
    
    // Function to return bold text to default color
    function returnItemsToDefault() {
        allBoldItems.forEach(item => {
            item.classList.remove('highlight');
        });
        console.log("Bold items returned to default color");
    }
    
    // Initialize bold items
    getBoldItems();
    
    // Add event listeners to paragraph
    const boldParagraph = document.getElementById('boldParagraph');
    boldParagraph.addEventListener('mouseover', highlight);
    boldParagraph.addEventListener('mouseout', returnItemsToDefault);
    
    console.log("Mouse events added to paragraph");
}

// Exercise 4: Volume of a Sphere
function exercise4() {
    console.log("\n🎯 Exercise 4: Volume of a Sphere");
    
    const sphereForm = document.getElementById('sphereForm');
    const radiusInput = document.getElementById('radius');
    const volumeInput = document.getElementById('volume');
    
    sphereForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const radius = parseFloat(radiusInput.value);
        
        // Validate input
        if (isNaN(radius) || radius <= 0) {
            alert("Please enter a valid positive number for radius!");
            return;
        }
        
        // Calculate volume: V = (4/3) * π * r³
        const volume = (4/3) * Math.PI * Math.pow(radius, 3);
        
        // Display volume rounded to 2 decimal places
        volumeInput.value = volume.toFixed(2);
        
        console.log(`Sphere volume calculated: radius=${radius}, volume=${volume.toFixed(2)}`);
    });
    
    // Clear volume when radius changes
    radiusInput.addEventListener('input', function() {
        volumeInput.value = '';
    });
}

// =============================================
// INITIALIZATION
// =============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log("📄 DOM Fully Loaded - Initializing Exercises...");
    
    // Initialize all exercises
    exercise1();
    exercise2();
    exercise3();
    exercise4();
    
    console.log("\n✅ All Exercises Initialized Successfully!");
    console.log("\n📋 Exercise Summary:");
    console.log("   Exercise 1: Article manipulation with event listeners");
    console.log("   Exercise 2: Form handling and dynamic list creation");
    console.log("   Exercise 3: Text transformation with mouse events");
    console.log("   Exercise 4: Mathematical calculation with form validation");
});

// =============================================
// UTILITY FUNCTIONS
// =============================================

// Function to reset all exercises
function resetAllExercises() {
    console.log("🔄 Resetting all exercises...");
    
    // Reload the page
    location.reload();
}

// Make reset function globally available
window.resetAllExercises = resetAllExercises;