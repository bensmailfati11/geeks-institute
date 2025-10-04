// Exercise 1: is_Blank
function isBlank(str) {
    return str.trim() === '';
}

// Exercise 2: Abbrev_name
function abbrevName(fullName) {
    const names = fullName.split(' ');
    if (names.length === 1) return fullName;
    return names[0] + ' ' + names[names.length - 1].charAt(0) + '.';
}

// Exercise 3: SwapCase
function swapCase(str) {
    let result = '';
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        result += char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase();
    }
    return result;
}

// Exercise 4: Omnipresent value
function isOmnipresent(arr, value) {
    for (let subArray of arr) {
        if (!subArray.includes(value)) return false;
    }
    return true;
}

// Exercise 5: Red table (DOM Manipulation)
function colorDiagonalCells() {
    const table = document.body.firstElementChild;
    const rows = table.getElementsByTagName('tr');
    
    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        if (cells[i]) {
            cells[i].style.backgroundColor = 'red';
            cells[i].style.color = 'white';
        }
    }
}

// Test all exercises
console.log("=== JavaScript Exercises Test Results ===");

console.log("\n📝 Exercise 1: is_Blank");
console.log("isBlank(''):", isBlank('')); // true
console.log("isBlank('   '):", isBlank('   ')); // true
console.log("isBlank('abc'):", isBlank('abc')); // false

console.log("\n📝 Exercise 2: Abbrev_name");
console.log("abbrevName('Robin Singh'):", abbrevName('Robin Singh')); // "Robin S."
console.log("abbrevName('John Michael Doe'):", abbrevName('John Michael Doe')); // "John D."
console.log("abbrevName('Alice'):", abbrevName('Alice')); // "Alice"

console.log("\n📝 Exercise 3: SwapCase");
console.log("swapCase('The Quick Brown Fox'):", swapCase('The Quick Brown Fox')); // "tHE qUICK bROWN fOX"
console.log("swapCase('Hello World'):", swapCase('Hello World')); // "hELLO wORLD"

console.log("\n📝 Exercise 4: Omnipresent value");
console.log("isOmnipresent([[1, 1], [1, 3], [5, 1], [6, 1]], 1):", 
    isOmnipresent([[1, 1], [1, 3], [5, 1], [6, 1]], 1)); // true
console.log("isOmnipresent([[1, 1], [1, 3], [5, 1], [6, 1]], 6):", 
    isOmnipresent([[1, 1], [1, 3], [5, 1], [6, 1]], 6)); // false
console.log("isOmnipresent([[3, 4], [8, 3, 2], [3], [9, 3], [5, 3], [4, 3]], 3):", 
    isOmnipresent([[3, 4], [8, 3, 2], [3], [9, 3], [5, 3], [4, 3]], 3)); // true

console.log("\n📝 Exercise 5: Red table");
console.log("DOM function 'colorDiagonalCells()' is ready.");
console.log("This function will color diagonal table cells red when called in the HTML.");

console.log("\n✅ All exercises completed successfully!");