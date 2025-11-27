// Exercise 1 : Giphy API #2
// Create a program to fetch a gif. Make sure to check the status of the Response and to catch any occurring errors.
// Once the server sends back data, append one random GIF to the page.
// Hint : to find the URL of the gif, look for the sub-object named “images” inside the data you receive from the API.

const apiUrl = 'https://api.giphy.com/v1/gifs/search?q=hilarious&rating=g&api_key=hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My';

fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    // Get a random gif from the data
    const gifs = data.data;
    if (gifs.length > 0) {
      const randomIndex = Math.floor(Math.random() * gifs.length);
      const randomGif = gifs[randomIndex];
      const gifUrl = randomGif.images.fixed_height.url;
      console.log('Random GIF URL:', gifUrl);
      // In a browser environment, you would append to the page like:
      const img = document.createElement('img');
      img.src = gifUrl;
      img.alt = 'Random GIF';
      document.getElementById('gif-container').appendChild(img);
    } else {
      console.log('No gifs found');
    }
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

// Exercise 2 : Analyze #2
// Analyse the code provided below - what will be the outcome?

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

// let sequentialStart = async function () {
//     console.log('==SEQUENTIAL START==');
//     const slow = await resolveAfter2Seconds();
//     console.log(slow);
//     const fast = await resolveAfter1Second();
//     console.log(fast);
// }

// sequentialStart()

// The outcome will be:
// ==SEQUENTIAL START==
// starting slow promise
// (after 2 seconds) slow promise is done
// slow
// starting fast promise
// (after another 1 second) fast promise is done
// fast

// Exercise 3 : Analyze #3
// Analyse the code provided below - what will be the outcome?

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

// let concurrentStart = async function () {
//     console.log('==CONCURRENT START with await==');
//     const slow = resolveAfter2Seconds();
//     const fast = resolveAfter1Second();
//     console.log(await slow);
//     console.log(await fast);
// }

// setTimeout(concurrentStart, 4000)

// The outcome will be (after 4 seconds):
// ==CONCURRENT START with await==
// starting slow promise
// starting fast promise
// (after 1 second) fast promise is done
// (after another 1 second) slow promise is done
// slow
// fast

// Exercise 4 : Modify fetch with Async/Await
// Modify the function above. Add async await in place of the following line:
// fetch(url).then(resp => resp.json())
// So there shouldn’t be any .then() calls anymore!
// Add a try catch block in order to catch any errors. To test the catch, modify one of the urls. The catch should console.log ‘ooooooops’.

const urls = [
  "https://jsonplaceholder.typicode.com/users",
  "https://jsonplaceholder.typicode.com/posts",
  "https://jsonplaceholder.typicode.com/albums"
];

const getData = async function() {
  try {
    const [ users, posts, albums ] = await Promise.all(urls.map(async url => {
      const resp = await fetch(url);
      if (!resp.ok) {
        throw new Error(`HTTP error! status: ${resp.status}`);
      }
      return await resp.json();
    }));
    console.log('users', users);
    console.log('posts', posts);
    console.log('albums', albums);
  } catch (error) {
    console.log('ooooooops');
    console.error('Error:', error);
  }
}

getData();
