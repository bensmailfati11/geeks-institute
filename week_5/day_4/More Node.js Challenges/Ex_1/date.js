// Exercise 1: Date #1
// Function that returns the time left until January 1st

function timeUntilJanuary1st() {
    const now = new Date();
    const currentYear = now.getFullYear();
    
    // Next January 1st (if we're already past it this year, get next year's)
    let nextJan1 = new Date(currentYear + 1, 0, 1, 0, 0, 0);
    
    // Calculate the difference in milliseconds
    const diff = nextJan1 - now;
    
    // Convert to days, hours, minutes, seconds
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    return `The 1st January is in ${days} days and ${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} hours`;
}

module.exports = timeUntilJanuary1st;
