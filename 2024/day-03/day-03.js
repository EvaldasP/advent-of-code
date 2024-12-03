const fs = require("fs");
const text = fs.readFileSync("input.txt", "utf8");

// --- Part One ---

const pattern = /mul\((\d{1,3}),(\d{1,3})\)/g;
const matches = [...text.matchAll(pattern)];
const numberPairs = matches.map((match) => match.slice(1).map(Number));

const mulInstructionTotal = numberPairs.reduce(
  (acc, [first, second]) => acc + first * second,
  0
);

console.log("Mul Instruction Total:", mulInstructionTotal);
