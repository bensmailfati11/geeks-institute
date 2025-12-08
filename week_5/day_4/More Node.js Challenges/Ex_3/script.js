// Exercise 3: Display today's date and time until next holiday
const timeUntilNextHoliday = require('./date.js');

const result = timeUntilNextHoliday();
console.log(`Today is: ${result.today}`);
console.log(result.message);

// Bonus: Using a node module to get real holiday dates
// Install dependencies with: npm install
// Then uncomment the code below to use it:

/*
const Holidays = require('date-holidays');

function getNextHolidayWithModule() {
    const hd = new Holidays('US'); // Change country code as needed
    const now = new Date();
    const currentYear = now.getFullYear();
    
    // Get all holidays for this year and next year
    const thisYearHolidays = hd.getHolidays(currentYear);
    const nextYearHolidays = hd.getHolidays(currentYear + 1);
    const allHolidays = [...thisYearHolidays, ...nextYearHolidays];
    
    // Find the next holiday
    let nextHoliday = null;
    for (const holiday of allHolidays) {
        const holidayDate = new Date(holiday.date);
        if (holidayDate > now) {
            nextHoliday = {
                name: holiday.name,
                date: holidayDate
            };
            break;
        }
    }
    
    if (nextHoliday) {
        const diff = nextHoliday.date - now;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        console.log('\n--- Using date-holidays module ---');
        console.log(`The next holiday is ${nextHoliday.name} in ${days} days and ${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} hours`);
    }
}

getNextHolidayWithModule();
*/
