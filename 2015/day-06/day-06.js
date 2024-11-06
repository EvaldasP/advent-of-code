// --- Day 6: Probably a Fire Hazard ---

const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8");

// --- Part One ---

const commands = input.split("\n");
const ledGrid = Array.from({ length: 1000 }, () =>
  Array(1000).fill({ state: "off", brightness: 0 })
);

commands.forEach((cmd) => {
  const regex =
    /^(turn on|turn off|toggle)\s(\d+),(\d+)\sthrough\s(\d+),(\d+)$/;

  const match = cmd.match(regex);

  if (match) {
    const action = match[1]; // 'turn on', 'turn off', or 'toggle'
    const startCord = [parseInt(match[2]), parseInt(match[3])]; // [startX, startY]
    const finishCord = [parseInt(match[4]), parseInt(match[5])]; // [finishX, finishY]

    for (let indexX = startCord[0]; indexX <= finishCord[0]; indexX++) {
      for (let indexY = startCord[1]; indexY <= finishCord[1]; indexY++) {
        const { state, brightness } = ledGrid[indexX][indexY];

        switch (action) {
          case "turn on":
            ledGrid[indexX][indexY] = {
              state: "on",
              brightness: brightness + 1,
            };
            break;
          case "turn off":
            ledGrid[indexX][indexY] = {
              state: "off",
              brightness: brightness ? brightness - 1 : 0,
            };
            break;
          case "toggle":
            ledGrid[indexX][indexY] = {
              state: state === "on" ? "off" : "on",
              brightness: brightness + 2,
            };

            break;
        }
      }
    }
  }
});

let onLEDs = 0;
let totalBrightness = 0;

ledGrid.forEach((x) => {
  x.forEach((led) => {
    if (led.state === "on") {
      onLEDs++;
    }
    totalBrightness += led.brightness;
  });
});

console.log("Total LEDs", onLEDs);

// --- Part Two ---

console.log("Total Brightness", totalBrightness);
