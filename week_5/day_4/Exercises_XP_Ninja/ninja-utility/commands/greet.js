const chalk = require('chalk');

function greet(name) {
    console.log(chalk.green(`Hello, ${name}! Welcome to Ninja Utility.`));
}

module.exports = greet;
