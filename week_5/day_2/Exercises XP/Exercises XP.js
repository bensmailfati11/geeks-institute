// 🌟 Exercise 1 : Giphy API
// Create a program to retrieve the data from the API URL provided.
// Use the fetch() method to make a GET request to the Giphy API and Console.log the Javascript Object that you receive.
// Make sure to check the status of the Response and to catch any occuring errors.

const apiUrl = 'https://api.giphy.com/v1/gifs/search?q=hilarious&rating=g&api_key=hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My';

fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

// 🌟 Exercise 2 : Giphy API
// Use the Fetch API to retrieve 10 gifs about the “sun”. The starting position of the results should be 2.
// Make sure to check the status of the Response and to catch any occuring errors.
// Console.log the Javascript Object that you receive.

const sunApiUrl = 'https://api.giphy.com/v1/gifs/search?q=sun&limit=10&offset=2&rating=g&api_key=hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My';

fetch(sunApiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

// 🌟 Exercise 3 : Async function
// Improve the program below :
// fetch("https://www.swapi.tech/api/starships/9/")
//     .then(response => response.json())
//     .then(objectStarWars => console.log(objectStarWars.result));
// Create an async function, that will await for the above GET request.
// The program shouldn’t contain any then() method.
// Make sure to check the status of the Response and to catch any occuring errors.

async function fetchStarWarsStarship() {
  try {
    const response = await fetch('https://www.swapi.tech/api/starships/9/');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const objectStarWars = await response.json();
    console.log(objectStarWars.result);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

fetchStarWarsStarship();

// 🌟 Exercise 4: Analyze
// Analyse the code provided below - what will be the outcome?
 function resolveAfter2Seconds() {
     return new Promise(resolve => {
      setTimeout(() => {
            resolve('resolved');
     }, 2000);
    });
}

async function asyncCall() {
   console.log('calling');
  let result = await resolveAfter2Seconds();
       console.log(result);
 }

asyncCall();

// The outcome will be:
// First, "calling" is logged immediately.
// Then, after 2 seconds, "resolved" is logged.
// This is because the async function pauses at the await until the promise resolves.
