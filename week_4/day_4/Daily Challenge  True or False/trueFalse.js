function allTruthy(...args) {
    return args.every(arg => Boolean(arg));
}

// Test cases
console.log(allTruthy(true, true, true)); // true
console.log(allTruthy(true, false, true)); // false
console.log(allTruthy(5, 4, 3, 2, 1, 0)); // false
console.log(allTruthy("hello", 42, [], {})); // true
console.log(allTruthy("", null, undefined)); // false

// Alternative implementations:

// Using for loop
function allTruthyForLoop(...args) {
    for (let i = 0; i < args.length; i++) {
        if (!args[i]) {
            return false;
        }
    }
    return true;
}

// Using reduce
function allTruthyReduce(...args) {
    return args.reduce((acc, curr) => acc && Boolean(curr), true);
}