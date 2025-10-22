// Exercise 1 : Promise.all()

const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 3000, 'foo');
});


Promise.all([promise1, promise2, promise3])
  .then(values => {
    console.log('Exercise 1 - Promise.all result:', values);
    // expected output: Array [3, 42, "foo"]
  })
  .catch(error => {
    console.log('Exercise 1 - Error:', error);
  });

// Example with rejection to demonstrate error handling
const promise4 = Promise.resolve('success');
const promise5 = Promise.reject('intentional error');

Promise.all([promise4, promise5])
  .then(values => {
    console.log('This will not run due to rejection');
  })
  .catch(error => {
    console.log('Exercise 1 - Rejection example:', error);
    // This will catch immediately when promise5 rejects
  });

// Exercise 2 : Analyse Promise.all()

function timesTwoAsync(x) {
  return new Promise(resolve => resolve(x * 2));
}

const arr = [1, 2, 3];
const promiseArr = arr.map(timesTwoAsync);

// Analysis of what will happen:
// 1. arr.map(timesTwoAsync) creates an array of 3 promises:
//    - timesTwoAsync(1) returns Promise that resolves to 2
//    - timesTwoAsync(2) returns Promise that resolves to 4  
//    - timesTwoAsync(3) returns Promise that resolves to 6
// 2. Promise.all(promiseArr) waits for ALL promises to resolve
// 3. Since all promises resolve immediately (no setTimeout), they resolve almost instantly
// 4. The .then() callback receives the array [2, 4, 6]
// 5. console.log(result) outputs: [2, 4, 6]

Promise.all(promiseArr)
  .then(result => {
    console.log('Exercise 2 - Result:', result);
    // Expected output: [2, 4, 6]
  });

// Additional demonstration with async/await for better understanding
async function demonstratePromiseAll() {
  console.log('\n=== Async/Await Demonstration ===');
  
  try {
    // Exercise 1 with async/await
    const result1 = await Promise.all([promise1, promise2, promise3]);
    console.log('Async/Await - Exercise 1:', result1);
    
    // Exercise 2 with async/await
    const result2 = await Promise.all(promiseArr);
    console.log('Async/Await - Exercise 2:', result2);
    
  } catch (error) {
    console.log('Async/Await Error:', error);
  }
}

// Run the async demonstration after Exercise 1's setTimeout completes
setTimeout(() => {
  demonstratePromiseAll();
}, 3500);

// Real-world example of Promise.all usefulness
console.log('\n=== Real-world Example ===');

function fetchUserData(userId) {
  return new Promise(resolve => {
    setTimeout(() => resolve(`User${userId} data`), Math.random() * 1000);
  });
}

function fetchUserPosts(userId) {
  return new Promise(resolve => {
    setTimeout(() => resolve(`User${userId} posts`), Math.random() * 1000);
  });
}

function fetchUserSettings(userId) {
  return new Promise(resolve => {
    setTimeout(() => resolve(`User${userId} settings`), Math.random() * 1000);
  });
}

// Without Promise.all - would have to wait for each sequentially
// With Promise.all - all requests happen in parallel
const userId = 123;
const userPromises = [
  fetchUserData(userId),
  fetchUserPosts(userId),
  fetchUserSettings(userId)
];

Promise.all(userPromises)
  .then(([userData, userPosts, userSettings]) => {
    console.log('Real-world Example Result:');
    console.log('User Data:', userData);
    console.log('User Posts:', userPosts);
    console.log('User Settings:', userSettings);
  })
  .catch(error => {
    console.log('Real-world Example Error:', error);
  });