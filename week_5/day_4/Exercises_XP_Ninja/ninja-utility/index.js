const { program } = require('commander');
const greet = require('./commands/greet');
const fetchData = require('./commands/fetch');
const readFile = require('./commands/read');

program
    .command('greet <name>')
    .description('Greet a user')
    .action((name) => greet(name));

program
    .command('fetch')
    .description('Fetch data from API')
    .action(() => fetchData());

program
    .command('read <file>')
    .description('Read a file')
    .action((file) => readFile(file));

program.parse(process.argv);
