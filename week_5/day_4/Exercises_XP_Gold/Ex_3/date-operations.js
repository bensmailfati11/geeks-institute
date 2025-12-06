// date-operations.js
const { addDays, format } = require("date-fns");

function showDateInfo() {
  const now = new Date();
  console.log("Current date:", now);

  const newDate = addDays(now, 5);
  const formatted = format(newDate, "yyyy-MM-dd HH:mm:ss");

  console.log("Date after 5 days:", formatted);
}

module.exports = showDateInfo;
