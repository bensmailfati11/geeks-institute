//  Exercise 3 :
const axios = require('axios');

async function fetchPosts() {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    return response.data;
  } catch (error) {
    throw new Error('Error fetching posts');
  }
}

module.exports = { fetchPosts };
