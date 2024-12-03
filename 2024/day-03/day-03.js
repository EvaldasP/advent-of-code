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

// --- Part Two ---

// Regular expression to match "do()", "don't()", and "mul(number, number)"
const pattern2 = /do\(\)|don't\(\)|mul\((\d{1,3}),(\d{1,3})\)/g;

let isEnabled = true;

const matches2 = [...text.matchAll(pattern2)];
const mulImprovedInstructionTotal = matches2.reduce((acc, match) => {
  const step = match[0];

  if (step === "do()") {
    isEnabled = true;
  } else if (step === "don't()") {
    isEnabled = false;
  } else if (isEnabled) {
    const [first, second] = match.slice(1).map(Number);
    acc += first * second;
  }

  return acc;
}, 0);

console.log("Mul Improved Instruction Total:", mulImprovedInstructionTotal);
