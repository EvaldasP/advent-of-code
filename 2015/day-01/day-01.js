const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8");

// --- Day 1: Not Quite Lisp ---

// --- Part One ---

const directions = [...input];
let currentFloor = 0;

directions.forEach((direction) => {
  currentFloor += direction === "(" ? 1 : -1;
});

console.log(currentFloor);

// --- Part Two ---

let positionEnterBasement;

for (let index = 0, currentFloor = 0; index < directions.length; index++) {
  currentFloor += directions[index] === "(" ? 1 : -1;

  if (currentFloor === -1) {
    positionEnterBasement = index + 1;
    break;
  }
}

console.log(positionEnterBasement);
