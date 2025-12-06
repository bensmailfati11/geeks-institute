const axios = require('axios');

async function fetchData() {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        console.log('Users:', response.data.map(user => user.name));
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

module.exports = fetchData;