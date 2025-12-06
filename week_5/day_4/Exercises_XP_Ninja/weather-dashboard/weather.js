const axios = require('axios');
const chalk = require('chalk');

const API_KEY = '598de8b8f321f52ba8e1cf24b0fc7464'; 

async function getWeather(city) {
    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        const data = response.data;
        console.log(chalk.blue(`Weather in ${city}:`));
        console.log(chalk.yellow(`Temperature: ${data.main.temp}°C`));
        console.log(chalk.green(`Description: ${data.weather[0].description}`));
    } catch (error) {
        console.error(chalk.red('Error fetching weather data:', error.message));
    }
}

module.exports = getWeather;
