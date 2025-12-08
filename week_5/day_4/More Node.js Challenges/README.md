# More Node.js Challenges

This folder contains three exercises focused on working with dates in Node.js.

## Structure

```
More Node.js Challenges/
├── .gitignore
├── package.json       # Global dependencies
├── Ex_1/
│   ├── date.js        # Function to calculate time until January 1st
│   └── script.js      # Main script to display the result
├── Ex_2/
│   ├── date.js        # Function to calculate minutes lived
│   └── script.js      # Main script with hardcoded birthdate
└── Ex_3/
    ├── date.js        # Function to calculate time until next holiday
    └── script.js      # Main script with bonus module usage
```

## Exercise 1: Date #1
Calculate the time remaining until January 1st from now.

**Run:**
```bash
node Ex_1/script.js
# Or use npm script:
npm run ex1
```

**Output example:**
```
The 1st January is in 23 days and 15:34:12 hours
```

## Exercise 2: Date #2
Calculate the number of minutes a person has lived since their birthdate.

**Run:**
```bash
node Ex_2/script.js
# Or use npm script:
npm run ex2
```

**Bonus - With user input:**
```bash
npm install
# Then uncomment the bonus code in Ex_2/script.js
npm run ex2
```

**Output example:**
```
You have lived 18,345,600 minutes in your life.
```

## Exercise 3: Date #3
Display today's date and calculate time until the next holiday.

**Run:**
```bash
node Ex_3/script.js
# Or use npm script:
npm run ex3
```

**Bonus - With date-holidays module:**
```bash
npm install
# Then uncomment the bonus code in Ex_3/script.js
npm run ex3
```

**Output example:**
```
Today is: Sunday, December 8, 2025
The next holiday is Christmas in 17 days and 10:30:45 hours
```

## Key Concepts

- **Node.js modules**: Using `module.exports` and `require()`
- **Date manipulation**: Working with JavaScript Date objects
- **Time calculations**: Converting milliseconds to days, hours, minutes, seconds
- **NPM packages**: Using external modules like `prompt-sync` and `date-holidays`

## Notes

- All exercises use ES5 module syntax (`require`/`module.exports`)
- Bonus features are commented out and require `npm install` to work
- Dates are hardcoded in the main exercises; bonus sections show how to make them dynamic
