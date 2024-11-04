// --- Day 3: Perfectly Spherical Houses in a Vacuum ---

// Santa is delivering presents to an infinite two-dimensional grid of houses.
// He begins by delivering a present to the house at his starting location, and then an elf at the North Pole calls him via radio and tells him where to move next. Moves are always exactly one house to the north (^), south (v), east (>), or west (<). After each move, he delivers another present to the house at his new location.
// However, the elf back at the north pole has had a little too much eggnog, and so his directions are a little off, and Santa ends up visiting some houses more than once. How many houses receive at least one present?

// For example:

// > delivers presents to 2 houses: one at the starting location, and one to the east.
// ^>v< delivers presents to 4 houses in a square, including twice to the house at his starting/ending location.
// ^v^v^v^v^v delivers a bunch of presents to some very lucky children at only 2 houses.

const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8");

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

// The next year, to speed up the process, Santa creates a robot version of himself, Robo-Santa, to deliver presents with him.
// Santa and Robo-Santa start at the same location (delivering two presents to the same starting house), then take turns moving based on instructions from the elf, who is eggnoggedly reading from the same script as the previous year.
// This year, how many houses receive at least one present?

// For example:

// ^v delivers presents to 3 houses, because Santa goes north, and then Robo-Santa goes south.
// ^>v< now delivers presents to 3 houses, and Santa and Robo-Santa end up back where they started.
// ^v^v^v^v^v now delivers presents to 11 houses, with Santa going one direction and Robo-Santa going the other.

let santaX = 0;
let santaY = 0;

let robotSantaX = 0;
let robotSantaY = 0;

const visitedHousesWithRobo = new Set();

visitedHousesWithRobo.add(`${santaX},${santaY}`);

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

  visitedHousesWithRobo.add(`${currentX},${currentY}`);
}

console.log(visitedHousesWithRobo.size);
