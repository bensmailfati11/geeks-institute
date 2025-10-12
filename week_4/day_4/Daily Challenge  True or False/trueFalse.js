function allTruthy(...args) {
    try {
        return args.every(Boolean);
    } catch {
        return false;
    }
}

// Test examples
console.log(allTruthy(true, true, true));     // true
console.log(allTruthy(true, false, true));    // false  
console.log(allTruthy(5, 4, 3, 2, 1, 0));     // false
console.log(allTruthy("hello", 1, []));       // true
console.log(allTruthy());                     // true (no args)