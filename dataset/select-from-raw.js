#!/usr/bin/env node

import { createReadStream } from "fs";
import { dirname, join } from "path";
import CsvReadableStream from "csv-reader";
import { createObjectCsvWriter } from "csv-writer";

const __dirname = dirname(new URL(import.meta.url).pathname);
console.log(__dirname);

let inputStream = createReadStream(
  join(__dirname, "traffic-crashes-crashes-1.csv"),
  "utf8"
);

const csvWriter = createObjectCsvWriter({
  path: join(__dirname, "location.csv"),
  header: [
    { id: "long", title: "LATITUDE" },
    { id: "lat", title: "LONGITUDE" },
  ],
});

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
      const newRow = { long: row[LONGITUDE], lat: row[LATITUDE] };
      if (typeof newRow.long === "number" && typeof newRow.lat === "number") {
        records.push(newRow);
      }
    }
  })
  .on("end", function () {
    csvWriter
      .writeRecords(records) // returns a promise
      .then(() => {
        console.log("...Done");
      });
  });
