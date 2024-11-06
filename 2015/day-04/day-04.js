// --- Day 4: The Ideal Stocking Stuffer ---

const crypto = require("crypto");
const secretKey = "yzbqklnj";

console.log(mineAdventCoin(secretKey));

function mineAdventCoin(secretKey) {
  let number = 1;

  while (true) {
    const hash = crypto
      .createHash("md5")
      .update(secretKey + number)
      .digest("hex");

    console.log(hash);

    // For part 2 - 000000
    if (hash.startsWith("00000")) {
      return number;
    }

    number++;
  }
}
