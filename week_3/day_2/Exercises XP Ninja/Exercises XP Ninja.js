console.log("=== JavaScript Exercises - Complete Solution ===");

// Exercise 1: Random Number
console.log("\n🎯 Exercise 1: Random Number");

function logEvenNumbers() {
    const randomNum = Math.floor(Math.random() * 100) + 1;
    console.log(`Random number between 1-100: ${randomNum}`);
    console.log(`Even numbers from 0 to ${randomNum}:`);
    
    const evenNumbers = [];
    for (let i = 0; i <= randomNum; i += 2) {
        evenNumbers.push(i);
    }
    console.log(evenNumbers.join(', '));
    return evenNumbers;
}

// Test Exercise 1
logEvenNumbers();

// Exercise 2: Capitalized letters
console.log("\n🎯 Exercise 2: Capitalized letters");

function capitalize(str) {
    let evenCapitalized = '';
    let oddCapitalized = '';
    
    for (let i = 0; i < str.length; i++) {
        if (i % 2 === 0) {
            evenCapitalized += str[i].toUpperCase();
            oddCapitalized += str[i].toLowerCase();
        } else {
            evenCapitalized += str[i].toLowerCase();
            oddCapitalized += str[i].toUpperCase();
        }
    }
    
    return [evenCapitalized, oddCapitalized];
}

// Test Exercise 2
console.log("capitalize('abcdef'):", capitalize('abcdef')); // ['AbCdEf', 'aBcDeF']
console.log("capitalize('hello'):", capitalize('hello')); // ['HeLlO', 'hElLo']
console.log("capitalize('javascript'):", capitalize('javascript'));

// Exercise 3: Is palindrome?
console.log("\n🎯 Exercise 3: Is palindrome?");

function isPalindrome(str) {
    const cleanStr = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    const reversedStr = cleanStr.split('').reverse().join('');
    return cleanStr === reversedStr;
}

// Test Exercise 3
console.log("isPalindrome('madam'):", isPalindrome('madam')); // true
console.log("isPalindrome('bob'):", isPalindrome('bob')); // true
console.log("isPalindrome('kayak'):", isPalindrome('kayak')); // true
console.log("isPalindrome('hello'):", isPalindrome('hello')); // false
console.log("isPalindrome('A man a plan a canal Panama'):", isPalindrome('A man a plan a canal Panama')); // true

// Exercise 4: Biggest Number
console.log("\n🎯 Exercise 4: Biggest Number");

function biggestNumberInArray(arrayNumber) {
    let max = 0;
    
    for (let element of arrayNumber) {
        if (typeof element === 'number' && !isNaN(element) && element > max) {
            max = element;
        }
    }
    
    return max;
}

// Test Exercise 4
const array1 = [-1, 0, 3, 100, 99, 2, 99];
const array2 = ['a', 3, 4, 2];
const array3 = [];

console.log("biggestNumberInArray([-1,0,3,100,99,2,99]):", biggestNumberInArray(array1)); // 100
console.log("biggestNumberInArray(['a', 3, 4, 2]):", biggestNumberInArray(array2)); // 4
console.log("biggestNumberInArray([]):", biggestNumberInArray(array3)); // 0

// Exercise 5: Unique Elements
console.log("\n🎯 Exercise 5: Unique Elements");

function getUniqueElements(arr) {
    const uniqueArray = [];
    
    for (let element of arr) {
        if (!uniqueArray.includes(element)) {
            uniqueArray.push(element);
        }
    }
    
    return uniqueArray;
}

// Test Exercise 5
const list1 = [1, 2, 3, 3, 3, 3, 4, 5];
const list2 = ['a', 'b', 'a', 'c', 'b', 'd'];

console.log("getUniqueElements([1,2,3,3,3,3,4,5]):", getUniqueElements(list1)); // [1,2,3,4,5]
console.log("getUniqueElements(['a','b','a','c','b','d']):", getUniqueElements(list2)); // ['a','b','c','d']

// Exercise 6: Calendar
console.log("\n🎯 Exercise 6: Calendar");

function createCalendar(year, month, targetElement) {
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);
    
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay(); // 0 = Sunday, 1 = Monday, etc.
    
    // Adjust for Monday as first day (0 = Monday, 6 = Sunday)
    let startOffset = startingDay === 0 ? 6 : startingDay - 1;
    
    // Create table element
    const table = document.createElement('table');
    table.style.borderCollapse = 'collapse';
    table.style.width = '100%';
    table.style.textAlign = 'center';
    table.style.margin = '20px 0';
    table.style.fontFamily = 'Arial, sans-serif';
    
    // Create header with weekday names
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const weekdays = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];
    
    weekdays.forEach(day => {
        const th = document.createElement('th');
        th.textContent = day;
        th.style.border = '1px solid #333';
        th.style.padding = '12px';
        th.style.backgroundColor = '#f0f0f0';
        th.style.fontWeight = 'bold';
        headerRow.appendChild(th);
    });
    
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    // Create calendar body
    const tbody = document.createElement('tbody');
    let currentDate = 1;
    
    // Create weeks (maximum 6 weeks in a month)
    for (let week = 0; week < 6; week++) {
        const row = document.createElement('tr');
        
        // Create days for the week
        for (let day = 0; day < 7; day++) {
            const cell = document.createElement('td');
            cell.style.border = '1px solid #333';
            cell.style.padding = '12px';
            cell.style.height = '40px';
            cell.style.verticalAlign = 'middle';
            
            if (week === 0 && day < startOffset) {
                // Empty cells before the first day of month
                cell.textContent = '';
                cell.style.backgroundColor = '#f9f9f9';
            } else if (currentDate > daysInMonth) {
                // Empty cells after the last day of month
                cell.textContent = '';
                cell.style.backgroundColor = '#f9f9f9';
            } else {
                // Regular day
                cell.textContent = currentDate;
                cell.style.fontWeight = 'normal';
                
                // Highlight today if applicable
                const today = new Date();
                if (year === today.getFullYear() && 
                    month === today.getMonth() + 1 && 
                    currentDate === today.getDate()) {
                    cell.style.backgroundColor = '#ffeb3b';
                    cell.style.fontWeight = 'bold';
                }
                
                currentDate++;
            }
            
            row.appendChild(cell);
        }
        
        tbody.appendChild(row);
        
        // Stop if we've filled all days
        if (currentDate > daysInMonth) break;
    }
    
    table.appendChild(tbody);
    
    // Clear target element and append calendar
    if (targetElement) {
        targetElement.innerHTML = '';
        targetElement.appendChild(table);
    }
    
    console.log(`📅 Calendar for ${month}/${year} created successfully`);
    return table;
}

// Function to initialize calendar demo
function initCalendarDemo() {
    const calendarContainer = document.getElementById('calendarContainer');
    if (calendarContainer) {
        const today = new Date();
        createCalendar(today.getFullYear(), today.getMonth() + 1, calendarContainer);
        
        // Add controls for testing different months
        const controls = document.createElement('div');
        controls.style.margin = '20px 0';
        controls.innerHTML = `
            <button onclick="showPreviousMonth()">← Previous Month</button>
            <button onclick="showNextMonth()">Next Month →</button>
            <button onclick="showCurrentMonth()">Current Month</button>
        `;
        calendarContainer.parentNode.insertBefore(controls, calendarContainer);
    }
}

// Calendar navigation functions
function showPreviousMonth() {
    const calendarContainer = document.getElementById('calendarContainer');
    const title = document.querySelector('h2');
    let currentDate = new Date();
    
    if (title && title.textContent.includes('Calendar for')) {
        const match = title.textContent.match(/(\d+)\/(\d+)/);
        if (match) {
            currentDate = new Date(parseInt(match[2]), parseInt(match[1]) - 2);
        }
    }
    
    const prevMonth = currentDate.getMonth() + 1;
    const prevYear = currentDate.getFullYear();
    
    createCalendar(prevYear, prevMonth, calendarContainer);
    document.querySelector('h2').textContent = `Calendar for ${prevMonth}/${prevYear}`;
}

function showNextMonth() {
    const calendarContainer = document.getElementById('calendarContainer');
    const title = document.querySelector('h2');
    let currentDate = new Date();
    
    if (title && title.textContent.includes('Calendar for')) {
        const match = title.textContent.match(/(\d+)\/(\d+)/);
        if (match) {
            currentDate = new Date(parseInt(match[2]), parseInt(match[1]));
        }
    }
    
    const nextMonth = currentDate.getMonth() + 1;
    const nextYear = currentDate.getFullYear();
    
    createCalendar(nextYear, nextMonth, calendarContainer);
    document.querySelector('h2').textContent = `Calendar for ${nextMonth}/${nextYear}`;
}

function showCurrentMonth() {
    const calendarContainer = document.getElementById('calendarContainer');
    const today = new Date();
    createCalendar(today.getFullYear(), today.getMonth() + 1, calendarContainer);
    document.querySelector('h2').textContent = `Calendar for ${today.getMonth() + 1}/${today.getFullYear()}`;
}

