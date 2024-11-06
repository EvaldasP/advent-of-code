// --- Day 5: Doesn't He Have Intern-Elves For This? ---

const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8");

// --- Part One ---

const strings = input.split("\n");
let part1 = 0;

for (const word of strings) {
  if (!hasBadString(word) && hasVowels(word) && hasDoubleLetter(word)) {
    part1++;
  }
}

console.log("Number of nice strings part1:", part1);

function hasBadString(word) {
  const badString = ["ab", "cd", "pq", "xy"];

  return badString.some((bad) => word.includes(bad));
}

function hasVowels(word) {
  const vowels = ["a", "e", "i", "o", "u"];

  let vowelsCount = 0;
  const chars = [...word];

  for (const char of chars) {
    if (vowels.includes(char)) {
      vowelsCount++;
    }

    if (vowelsCount >= 3) {
      break;
    }
  }

  return vowelsCount >= 3;
}

function hasDoubleLetter(word) {
  const chars = [...word];

  for (let index = 0; index < chars.length; index++) {
    const element = chars[index];

    if (element === chars[index + 1]) {
      return true;
    }
  }

  return false;
}

// --- Part Two ---

let part2 = 0;
for (const word of strings) {
  const containsPairs = hasRepeatingPair(word);
  const containPattern = hasRepeatingLetterWithGap(word);

  if (containsPairs && containPattern) {
    part2++;
  }
}

console.log("Number of nice strings part2:", part2);

function hasRepeatingPair(word) {
  for (let i = 0; i < word.length - 1; i++) {
    const pair = word.slice(i, i + 2); // Get the current two-letter pair
    if (word.indexOf(pair, i + 2) !== -1) {
      return true;
    }
  }
  return false;
}

function hasRepeatingLetterWithGap(word) {
  for (let i = 0; i < word.length - 2; i++) {
    if (word[i] === word[i + 2]) {
      return true;
    }
  }
  return false;
}
