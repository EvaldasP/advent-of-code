const fs = require("fs");
const data = fs.readFileSync("input.txt", "utf8");

const { rules, updates } = prepareData(data);
let correctUpdates = [];
let fixedUpdates = [];

for (const update of updates) {
  let isCorrectUpdate = true;

  for (const rule of rules) {
    if (ignoreRule(rule, update)) {
      continue;
    }

    if (validateRule(rule, update)) {
      isCorrectUpdate = true;
    } else {
      isCorrectUpdate = false;
      break;
    }
  }

  if (isCorrectUpdate) {
    correctUpdates.push(update);
    continue;
  }

  fixedUpdates.push(fixUpdate(update, rules));
}

// --- Part One ---
console.log("Total Of Middle Pages:", countMiddlePageTotal(correctUpdates));

// --- Part Two ---
console.log(
  "Total Of Middle Pages Fixed Updates:",
  countMiddlePageTotal(fixedUpdates)
);

function fixUpdate(update, rules) {
  let modifiedUpdate = update.split(",");
  let flagged = true;

  while (flagged) {
    flagged = false;
    for (const rule of rules) {
      if (ignoreRule(rule, modifiedUpdate)) {
        continue;
      }

      if (!validateRule(rule, modifiedUpdate)) {
        const [first, second] = rule.split("|");

        const indexFirst = modifiedUpdate.indexOf(first);
        const indexSecond = modifiedUpdate.indexOf(second);

        // swap
        modifiedUpdate[indexFirst] = second;
        modifiedUpdate[indexSecond] = first;
        flagged = true;
        break;
      }
    }
  }

  return modifiedUpdate.join();
}

function validateRule(rule, update) {
  const [first, second] = rule.split("|");

  const indexFirst = update.indexOf(first);
  const indexSecond = update.indexOf(second);

  if (indexFirst < indexSecond) {
    return true;
  }

  return false;
}

function ignoreRule(rule, update) {
  const [first, second] = rule.split("|");
  return ![first, second].every((page) => update.includes(page));
}

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
