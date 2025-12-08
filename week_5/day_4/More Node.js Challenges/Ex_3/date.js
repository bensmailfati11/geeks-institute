// Exercise 3: Date #3
// Function that returns today's date and time until next holiday

function timeUntilNextHoliday() {
    const now = new Date();
    const currentYear = now.getFullYear();
    
    // Hardcoded holidays for demonstration
    // Format: { name: 'Holiday Name', date: new Date(year, month, day) }
    const holidays = [
        { name: "New Year's Day", date: new Date(currentYear, 0, 1) },
        { name: "Valentine's Day", date: new Date(currentYear, 1, 14) },
        { name: "Easter", date: new Date(currentYear, 3, 9) },
        { name: "Labor Day", date: new Date(currentYear, 4, 1) },
        { name: "Independence Day", date: new Date(currentYear, 6, 4) },
        { name: "Thanksgiving", date: new Date(currentYear, 10, 23) },
        { name: "Christmas", date: new Date(currentYear, 11, 25) },
        { name: "New Year's Day (Next Year)", date: new Date(currentYear + 1, 0, 1) }
    ];
    
    // Find the next holiday
    let nextHoliday = null;
    for (const holiday of holidays) {
        if (holiday.date > now) {
            nextHoliday = holiday;
            break;
        }
    }
    
    if (!nextHoliday) {
        nextHoliday = holidays[holidays.length - 1];
    }
    
    // Calculate time difference
    const diff = nextHoliday.date - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    const todayStr = now.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    return {
        today: todayStr,
        message: `The next holiday is ${nextHoliday.name} in ${days} days and ${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} hours`
    };
}

module.exports = timeUntilNextHoliday;
