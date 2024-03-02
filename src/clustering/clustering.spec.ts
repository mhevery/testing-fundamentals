import { bench, describe, expect, it } from "vitest";
import { cluster, loadDataset } from "./clustering";

describe("Clustering", () => {
  it("should load data", () => {
    const dataset = loadDataset();
    expect(dataset).toMatchSnapshot();
  });

  it("should cluster data", () => {
    const dataset = [
      { lng: 0, lat: 0 },
      { lng: 1, lat: 1 },
      { lng: 10, lat: 10 },
      { lng: 11, lat: 11 },
    ];
    const clusters = cluster(dataset, 5, 1);
    expect(clusters).toEqual({
      latMax: 11,
      latMin: 0,
      lngMax: 11,
      lngMin: 0,
      clusters: [
        {
          latMin: 0,
          latMax: 1,
          lngMin: 0,
          lngMax: 1,
          data: [
            { lng: 0, lat: 0 },
            { lng: 1, lat: 1 },
          ],
        },
        {
          latMin: 10,
          latMax: 11,
          lngMin: 10,
          lngMax: 11,
          data: [
            { lng: 10, lat: 10 },
            { lng: 11, lat: 11 },
          ],
        },
      ],
    });
  });
});

describe("data fetching", () => {
  it("should fetch data", async ({ expect, task }) => {
    console.log(import.meta.vitest);
    console.log(task);
  });
});
