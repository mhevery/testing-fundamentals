import { bench, describe, expect, it } from "vitest";
import { cluster, loadDataset } from "./clustering";

describe("Clustering", () => {
  bench("sorting", () => {
    const numbers = new Array(1000000).map((_, i) => Math.random());
    numbers.sort();
  });
});
