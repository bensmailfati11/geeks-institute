// 🌟 Exercise 1 : List of people

const people = ["Greg", "Mary", "Devon", "James"];

// 1. Remove “Greg”
people.shift();   // removes first element
console.log(people); // ["Mary","Devon","James"]

// 2. Replace “James” with “Jason”
people[people.indexOf("James")] = "Jason";
console.log(people); // ["Mary","Devon","Jason"]

// 3. Add your name to the end
people.push("Fati");  // put your own name
console.log(people); // ["Mary","Devon","Jason","Fati"]

// 4. Console.log Mary’s index
console.log( people.indexOf("Mary") ); // 0

// 5. Make a copy without “Mary” and without your name
// current array is ["Mary","Devon","Jason","Fati"]
const copy = people.slice(1, 3);  // from index 1 to 3 (not including 3)
console.log(copy); // ["Devon","Jason"]

// 6. Index of “Foo”
console.log( people.indexOf("Foo") ); // -1 (because it’s not in the array)

// 7. Last element of the array
const last = people[people.length - 1];
console.log(last); // "Fati"


// -------- Part II – Loops --------

// 8. Loop through and console.log each person
for (let i = 0; i < people.length; i++) {
  console.log(people[i]);
}

// 9. Loop and stop after logging “Devon”
for (let i = 0; i < people.length; i++) {
  console.log(people[i]);
  if (people[i] === "Devon") {
    break;      // stop the loop
  }
}
