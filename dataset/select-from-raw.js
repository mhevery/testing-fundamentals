#!/usr/bin/env node

import { createReadStream, writeFile } from "fs";
import { dirname, join } from "path";
import CsvReadableStream from "csv-reader";

const __workspace = dirname(dirname(new URL(import.meta.url).pathname));
console.log(__workspace);

let inputStream = createReadStream(
  join(__workspace, "dataset", "traffic-crashes-crashes-1.csv"),
  "utf8"
);

let records = [];
let LATITUDE = -1;
let LONGITUDE = -1;

inputStream
  .pipe(
    new CsvReadableStream({
      parseNumbers: true,
      parseBooleans: true,
      trim: true,
    })
  )
  .on("data", function (row) {
    if (LATITUDE === -1 && LONGITUDE === -1) {
      LATITUDE = row.indexOf("LATITUDE");
      LONGITUDE = row.indexOf("LONGITUDE");
    } else {
      const newRow = { lng: row[LONGITUDE], lat: row[LATITUDE] };
      if (typeof newRow.lng === "number" && typeof newRow.lat === "number") {
        records.push(newRow);
      }
    }
  })
  .on("end", function () {
    writeFile(
      join(__workspace, "src", "components", "dataset.json"),
      JSON.stringify(records.splice(1000), null, 2),
      (err) => {
        if (err) throw err;
        console.log("Data has been written to dataset.json");
      }
    );
  });
