const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8");

// Initialize starting point and direction
let position = [0, 0];
const directions = [
  [0, 1], // North
  [1, 0], // East
  [0, -1], // South
  [-1, 0], // West
];
let currentDirection = 0; // Start facing North

// Sample instructions
const instructions = input.split(", ");

instructions.forEach((instruction) => {
  const turn = instruction[0];
  const steps = parseInt(instruction.slice(1), 10);

  if (turn === "R") {
    currentDirection = (currentDirection + 1) % 4;
  } else if (turn === "L") {
    currentDirection = (currentDirection + 3) % 4;
  }

  position[0] += directions[currentDirection][0] * steps;
  position[1] += directions[currentDirection][1] * steps;
});

// Calculate Manhattan distance
const distance = Math.abs(position[0]) + Math.abs(position[1]);
console.log(`Shortest path to destination: ${distance} blocks`);
