const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8");

// --- Part One ---

const [list1, list2] = prepareLists(input);
const length = list1.length;

list1.sort((a, b) => a - b);
list2.sort((a, b) => a - b);

let totalDistance = 0;

for (let index = 0; index < length; index++) {
  const distance = Math.abs(list1[index] - list2[index]);

  totalDistance += distance;
}

console.log("Total Distance:", totalDistance);

// --- Part Two ---

let similarityScore = 0;

for (let index = 0; index < length; index++) {
  const firstListId = list1[index];

  const secondListOccurrences = list2.filter(
    (id) => id === firstListId
  )?.length;

  if (!secondListOccurrences) {
    continue;
  }

  similarityScore += firstListId * secondListOccurrences;
}

console.log("Similarity Score:", similarityScore);

function prepareLists(data) {
  const lines = data.split("\n");
  const column1 = [];
  const column2 = [];

  lines.forEach((line) => {
    const [col1, col2] = line.split(/\s+/);
    if (col1 && col2) {
      column1.push(Number(col1));
      column2.push(Number(col2));
    }
  });

  return [column1, column2];
}
