// Exercise 2: Date #2
// Function that calculates the number of minutes lived since birthdate

function minutesLived(birthdate) {
    // birthdate should be in format 'YYYY-MM-DD' or a Date object
    const birth = new Date(birthdate);
    const now = new Date();
    
    // Calculate the difference in milliseconds
    const diff = now - birth;
    
    // Convert to minutes
    const minutes = Math.floor(diff / (1000 * 60));
    
    return minutes;
}

module.exports = minutesLived;
