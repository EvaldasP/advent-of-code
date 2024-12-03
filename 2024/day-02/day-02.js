const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8");

// --- Part One ---

const reports = prepareReports(input);
let saveReports = 0;

for (const report of reports) {
  if (checkChangingSafely(report)) {
    saveReports++;
  }
}

console.log("Save Reports:", saveReports);

// --- Part Two ---
let safeReportsCount = 0;

for (const report of reports) {
  let result = checkChangingSafely(report);

  // If the report is safe already
  if (result) {
    safeReportsCount++;
    continue;
  }

  let isReportSafeWithDampener = false;

  for (let index = 0; index < report.length; index++) {
    const newReport = [...report];
    newReport.splice(index, 1);

    result = checkChangingSafely(newReport);

    if (result) {
      isReportSafeWithDampener = true;
      break;
    }
  }

  if (isReportSafeWithDampener) {
    safeReportsCount++;
  }
}

console.log("Save Reports Dampened:", safeReportsCount);

function checkChangingSafely(report) {
  const isReportIncreasing = report[0] < report[1];

  for (let index = 0; index < report.length - 1; index++) {
    const level = report[index];
    const nextLevel = report[index + 1];

    if (
      (isReportIncreasing && (level >= nextLevel || nextLevel - level > 3)) ||
      (!isReportIncreasing && (level <= nextLevel || level - nextLevel > 3))
    ) {
      return false;
    }
  }

  return true;
}

function prepareReports(data) {
  const lines = data.split("\n");
  return lines.map((line) => line.split(" ").map((element) => Number(element)));
}
