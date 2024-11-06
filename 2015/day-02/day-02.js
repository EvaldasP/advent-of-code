const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8");

// --- Day 2: I Was Told There Would Be No Math ---

// --- Part One ---

// Formula:
// 2*l*w + 2*w*h + 2*h*l

const presents = input.split("\n");
let totalPaperSquareFeet = 0;

presents.forEach((present) => {
  const [length, width, height] = present.split("x").map(Number);

  const side1 = length * width;
  const side2 = width * height;
  const side3 = height * length;

  // Find the smallest side for paper slack
  const smallestSide = Math.min(side1, side2, side3);
  const presentTotal = (side1 + side2 + side3) * 2 + smallestSide;

  totalPaperSquareFeet += presentTotal;
});

console.log(totalPaperSquareFeet);

// --- Part Two ---

let totalRibbon = 0;

presents.forEach((present) => {
  const [length, width, height] = present.split("x").map(Number);

  const perimeter1 = 2 * (length + width);
  const perimeter2 = 2 * (width + height);
  const perimeter3 = 2 * (height + length);

  // Find the smallest perimeter
  const smallestPerimeter = Math.min(perimeter1, perimeter2, perimeter3);
  const ribbonForBow = length * width * height;

  totalRibbon += smallestPerimeter + ribbonForBow;
});

console.log(totalRibbon);
