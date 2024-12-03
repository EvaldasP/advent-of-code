const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8");

// --- Part One ---

const reports = prepareReports(input);
let saveReports = 0;

for (const report of reports) {
  const isReportIncreasing = report[0] < report[1];
  let isReportSave = true;

  for (let index = 0; index < report.length; index++) {
    const level = report[index];
    const nextLevel = report[index + 1];

    if (
      isReportIncreasing &&
      (level >= nextLevel || nextLevel - level > 3 || nextLevel - level > 3)
    ) {
      isReportSave = false;
      break;
    }

    if (!isReportIncreasing && (level <= nextLevel || level - nextLevel > 3)) {
      isReportSave = false;
      break;
    }
  }

  if (isReportSave) {
    saveReports++;
  }
}

console.log("Save Reports:", saveReports);

function prepareReports(data) {
  const lines = data.split("\n");
  return lines.map((line) => line.split(" ").map((element) => Number(element)));
}
