// Exercise 1 : Giphy API #3
// In the HTML file, add a form, containing an input and a button. This input is used to fetch gif depending on a specific category.
// Use the Fetch API to fetch the gifs. Make sure to check the status of the Response and to catch any occuring errors.
// Append the relevant gifs to the page.
// Hint : to find the URL of the gif, look for the sub-object named “images” inside the data you receive from the API.
// Allow the user to remove all of the GIFs by clicking a delete button

const apiKey = 'hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My';

document.getElementById('fetch-gifs').addEventListener('click', function() {
  const category = document.getElementById('category-input').value;
  if (!category) {
    alert('Please enter a category');
    return;
  }
  const apiUrl = `https://api.giphy.com/v1/gifs/search?q=${category}&rating=g&api_key=${apiKey}`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      const gifs = data.data;
      const gifContainer = document.getElementById('gif-container');
      gifs.forEach(gif => {
        const img = document.createElement('img');
        img.src = gif.images.fixed_height.url;
        img.alt = gif.title;
        gifContainer.appendChild(img);
      });
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
});

document.getElementById('delete-gifs').addEventListener('click', function() {
  const gifContainer = document.getElementById('gif-container');
  gifContainer.innerHTML = '';
});

// Exercise 2 : Analyze #4
// Analyze the code provided below - what will be the outcome?

// let resolveAfter2Seconds = function () {
//     console.log("starting slow promise");
//     return new Promise(resolve => {
//         setTimeout(function () {
//             resolve("slow");
//             console.log("slow promise is done");
//         }, 2000);
//     });
// };

// let resolveAfter1Second = function () {
//     console.log("starting fast promise");
//     return new Promise(resolve => {
//         setTimeout(function () {
//             resolve("fast");
//             console.log("fast promise is done");
//         }, 1000);
//     });
// };

// //The Promise.all() method returns a single Promise that fulfills when all of the promises passed as an iterable have been fulfilled.

// let concurrentPromise = function () {
//     console.log('==CONCURRENT START with Promise.all==');
//     return Promise.all([resolveAfter2Seconds(), resolveAfter1Second()]).then((messages) => {
//         console.log(messages[0]);
//         console.log(messages[1]);
//     });
// }

// setTimeout(concurrentPromise, 1000)

// The outcome will be (after 1 second):
// ==CONCURRENT START with Promise.all==
// starting slow promise
// starting fast promise
// (after 1 second) fast promise is done
// (after another 1 second) slow promise is done
// slow
// fast

// Exercise 3 : Analyze #5
// Analyze the code provided below - what will be the outcome?

// let resolveAfter2Seconds = function () {
//     console.log("starting slow promise");
//     return new Promise(resolve => {
//         setTimeout(function () {
//             resolve("slow");
//             console.log("slow promise is done");
//         }, 2000);
//     });
// };

// let resolveAfter1Second = function () {
//     console.log("starting fast promise");
//     return new Promise(resolve => {
//         setTimeout(function () {
//             resolve("fast");
//             console.log("fast promise is done");
//         }, 1000);
//     });
// };

// let parallel = async function () {
//     console.log('==PARALLEL with await Promise.all==');
//     // Start 2 "jobs" in parallel and wait for both of them to complete
//     await Promise.all([
//         (async () => console.log(await resolveAfter2Seconds()))(),
//         (async () => console.log(await resolveAfter1Second()))()
//     ]);
// }

// setTimeout(parallel, 5000)

// The outcome will be (after 5 seconds):
// ==PARALLEL with await Promise.all==
// starting slow promise
// starting fast promise
// (after 1 second) fast promise is done
// fast
// (after another 1 second) slow promise is done
// slow

// Exercise 4 : Analyze #6
// Analyze the code provided below - what will be the outcome?

// let resolveAfter2Seconds = function () {
//     console.log("starting slow promise");
//     return new Promise(resolve => {
//         setTimeout(function () {
//             resolve("slow");
//             console.log("slow promise is done");
//         }, 2000);
//     });
// };

// let resolveAfter1Second = function () {
//     console.log("starting fast promise");
//     return new Promise(resolve => {
//         setTimeout(function () {
//             resolve("fast");
//             console.log("fast promise is done");
//         }, 1000);
//     });
// };

// // This function does not handle errors. See warning below!
// let parallelPromise = function () {
//     console.log('==PARALLEL with Promise.then==');
//     resolveAfter2Seconds().then((message) => console.log(message));
//     resolveAfter1Second().then((message) => console.log(message));
// }

// setTimeout(parallelPromise, 13000)

// The outcome will be (after 13 seconds):
// ==PARALLEL with Promise.then==
// starting slow promise
// starting fast promise
// (after 1 second) fast promise is done
// fast
// (after another 1 second) slow promise is done
// slow
