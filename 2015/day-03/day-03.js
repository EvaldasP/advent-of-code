const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8");

// --- Day 3: Perfectly Spherical Houses in a Vacuum ---

// --- Part One ---

const directions = [...input];
const visitedHouses = new Set();

let x = 0;
let y = 0;

visitedHouses.add(`${x},${y}`);

for (const direction of directions) {
  switch (direction) {
    case "^":
      y++;
      break;
    case "v":
      y--;
      break;
    case ">":
      x++;
      break;
    case "<":
      x--;
      break;
  }

  visitedHouses.add(`${x},${y}`);
}

console.log(visitedHouses.size);

// --- Part Two ---

let santaX = 0;
let santaY = 0;

let robotSantaX = 0;
let robotSantaY = 0;

const visitedHousesWithRobot = new Set();

visitedHousesWithRobot.add(`${santaX},${santaY}`);

for (const [index, direction] of directions.entries()) {
  const isSantaTurn = index % 2 === 0;
  let currentX = isSantaTurn ? santaX : robotSantaX;
  let currentY = isSantaTurn ? santaY : robotSantaY;

  switch (direction) {
    case "^":
      currentY++;
      break;
    case "v":
      currentY--;
      break;
    case ">":
      currentX++;
      break;
    case "<":
      currentX--;
      break;
  }

  if (isSantaTurn) {
    santaX = currentX;
    santaY = currentY;
  } else {
    robotSantaX = currentX;
    robotSantaY = currentY;
  }

  visitedHousesWithRobot.add(`${currentX},${currentY}`);
}

console.log(visitedHousesWithRobot.size);
