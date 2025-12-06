// app.js
const { readFile, writeFile } = require("./fileManager");

const hello = readFile("Hello World.txt");
console.log("File content:", hello);

writeFile("Bye World.txt", "Writing to the file");
