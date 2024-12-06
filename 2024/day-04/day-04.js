const fs = require("fs");
const text = fs.readFileSync("input.txt", "utf8");

let xmasCount = 0;
let xMasPatternCount = 0;

const letterMap = text.split("\n").map((string) => [...string]);
const directions = [
  { dr: -1, dc: 0 }, // Top
  { dr: -1, dc: 1 }, // Top-Right
  { dr: 0, dc: 1 }, // Right
  { dr: 1, dc: 1 }, // Bottom-Right
  { dr: 1, dc: 0 }, // Bottom
  { dr: 1, dc: -1 }, // Bottom-Left
  { dr: 0, dc: -1 }, // Left
  { dr: -1, dc: -1 }, // Top-Left
];

for (let row = 0; row < letterMap.length; row++) {
  for (let col = 0; col < letterMap[row].length; col++) {
    // --- Part One ---

    if (letterMap[row][col] === "X") {
      for (const { dr, dc } of directions) {
        if (checkWord(row, col, dr, dc)) {
          xmasCount++;
        }
      }
    }
    // --- Part Two ---

    if (letterMap[row][col] === "A") {
      if (isXMasPattern(row, col)) {
        xMasPatternCount++;
      }
    }
  }
}

console.log("X-MAS Count:", xmasCount);
console.log("X-MAS Pattern Count:", xMasPatternCount);

function checkWord(row, col, dr, dc) {
  const m = letterMap[row + dr]?.[col + dc];
  const a = letterMap[row + 2 * dr]?.[col + 2 * dc];
  const s = letterMap[row + 3 * dr]?.[col + 3 * dc];
  return m === "M" && a === "A" && s === "S";
}

function isXMasPattern(row, col) {
  // M.S
  // .A.
  // M.S

  const topLeft = letterMap[row - 1]?.[col - 1];
  const bottomLeft = letterMap[row + 1]?.[col - 1];
  const topRight = letterMap[row - 1]?.[col + 1];
  const bottomRight = letterMap[row + 1]?.[col + 1];

  const hasMTopLeftAndSBottomRight = topLeft === "M" && bottomRight === "S";
  const hasSTopLeftAndMBottomRight = topLeft === "S" && bottomRight === "M";
  const hasMTopRightAndSBottomLeft = topRight === "M" && bottomLeft === "S";
  const hasSTopRightAndMBottomLeft = topRight === "S" && bottomLeft === "M";

  return (
    (hasMTopLeftAndSBottomRight || hasSTopLeftAndMBottomRight) &&
    (hasMTopRightAndSBottomLeft || hasSTopRightAndMBottomLeft)
  );
}
