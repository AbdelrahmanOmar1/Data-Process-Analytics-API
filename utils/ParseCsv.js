const fs = require("fs");
const parseCSV = require("csv-parser");

function parseCSVFile(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];

    fs.createReadStream(filePath)
      .pipe(parseCSV())
      .on("data", (data) => {
        const values = Object.values(data);

        const isEmpty = values.every(
          (v) => v === "" || v === null || v === undefined,
        );

        if (!isEmpty) results.push(data);
      })
      .on("end", () => resolve(results))
      .on("error", reject);
  });
}

module.exports = { parseCSVFile };
