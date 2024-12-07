const fs = require("fs");
const data = fs.readFileSync("input.txt", "utf8");

const { rules, updates } = prepareData(data);
let correctUpdates = [];

for (const update of updates) {
  let isCorrectUpdate = true;

  for (const rule of rules) {
    const [first, second] = rule.split("|");

    if (![first, second].every((page) => update.includes(page))) {
      continue;
    }

    const indexFirst = update.indexOf(first);
    const indexSecond = update.indexOf(second);

    if (indexFirst < indexSecond) {
      isCorrectUpdate = true;
    } else {
      isCorrectUpdate = false;
      break;
    }
  }

  if (isCorrectUpdate) {
    correctUpdates.push(update);
  }
}

// --- Part One ---

console.log("Total Of Middle Pages:", countMiddlePageTotal(correctUpdates));

function countMiddlePageTotal(correctUpdates) {
  return correctUpdates.reduce((acc, update) => {
    const updateArray = update.split(",");
    const midIndex = Math.floor(updateArray.length / 2);

    return (acc += Number(updateArray[midIndex]));
  }, 0);
}

function prepareData(data) {
  const lines = data.trim().split("\n");

  // Arrays to hold separated data
  const rules = [];
  const updates = [];

  // Separate data into two arrays
  lines.forEach((line) => {
    if (line.includes("|")) {
      rules.push(line);
    } else if (line.includes(",")) {
      updates.push(line);
    }
  });

  return { rules, updates };
}
