// Daily challenge : Go Wildcats
console.log("=== Daily challenge: Go Wildcats ===");

const gameInfo = [
  {
    username: "john",
    team: "red",
    score: 5,
    items: ["ball", "book", "pen"]
  },
  {
    username: "becky",
    team: "blue",
    score: 10,
    items: ["tape", "backpack", "pen"]
  },
  {
    username: "susy",
    team: "red",
    score: 55,
    items: ["ball", "eraser", "pen"]
  },
  {
    username: "tyson",
    team: "green",
    score: 1,
    items: ["book", "pen"]
  },
];

// 1. Create array with usernames + "!" using forEach
const usernames = [];
gameInfo.forEach(player => {
  usernames.push(player.username + "!");
});
console.log("1. Usernames with exclamation marks:");
console.log(usernames);

// 2. Create array with usernames of players with score > 5 using forEach
const winners = [];
gameInfo.forEach(player => {
  if (player.score > 5) {
    winners.push(player.username);
  }
});
console.log("\n2. Winners (score > 5):");
console.log(winners);

// 3. Find and display the total score
const totalScore = gameInfo.reduce((sum, player) => {
  return sum + player.score;
}, 0);
console.log("\n3. Total score of all users:");
console.log("Total score:", totalScore);

// Bonus: Display all calculations
console.log("\n--- Score Breakdown ---");
gameInfo.forEach(player => {
  console.log(`${player.username}: ${player.score} points`);
});
console.log(`TOTAL: ${totalScore} points`);

