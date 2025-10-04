// Exercise 1: BMI Comparison
console.log("=== Exercise 1: Checking the BMI ===");

let person1 = {
    fullName: "John Smith",
    mass: 78,
    height: 1.75,
    calculateBMI: function() {
        return this.mass / (this.height * this.height);
    }
};

let person2 = {
    fullName: "Emma Johnson", 
    mass: 65,
    height: 1.68,
    calculateBMI: function() {
        return this.mass / (this.height * this.height);
    }
};

function compareBMI(personA, personB) {
    let bmi1 = personA.calculateBMI();
    let bmi2 = personB.calculateBMI();
    
    console.log(personA.fullName + " BMI: " + bmi1.toFixed(2));
    console.log(personB.fullName + " BMI: " + bmi2.toFixed(2));
    
    if (bmi1 > bmi2) {
        console.log("🏆 " + personA.fullName + " has the larger BMI");
    } else if (bmi2 > bmi1) {
        console.log("🏆 " + personB.fullName + " has the larger BMI");
    } else {
        console.log("Both have the same BMI");
    }
}

compareBMI(person1, person2);

// Exercise 2: Grade Average
console.log("\n=== Exercise 2: Grade Average ===");

function findAvg(gradesList) {
    let sum = 0;
    for (let i = 0; i < gradesList.length; i++) {
        sum += gradesList[i];
    }
    let average = sum / gradesList.length;
    console.log("Grades: " + gradesList.join(", "));
    console.log("Average: " + average.toFixed(2));
    return average;
}

function checkPassOrFail(average) {
    if (average >= 65) {
        console.log("✅ Congratulations! You passed the course.");
    } else {
        console.log("❌ Sorry, you failed and must repeat the course.");
    }
}

function processGrades(gradesList) {
    let average = findAvg(gradesList);
    checkPassOrFail(average);
}

// Test the grade functions
console.log("--- Test Case 1 ---");
processGrades([85, 72, 90, 68, 79]);

console.log("\n--- Test Case 2 ---"); 
processGrades([55, 60, 58, 62, 59]);