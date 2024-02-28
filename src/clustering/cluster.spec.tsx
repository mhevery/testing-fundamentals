import { createDOM } from "@builder.io/qwik/testing";
import { describe, expect, it } from "vitest";
import Cluster from "./cluster";
import { cluster } from "./clustering";

describe("cluster-component", () => {
  it("should render a cluster of 4 points", async () => {
    const dataset = [
      { lng: 0, lat: 0 },
      { lng: 0, lat: 1 },
      { lng: 9, lat: 10 },
      { lng: 10, lat: 10 },
    ];
    const { chart, points } = await renderCluster(dataset);
    expect(chart.style.height).toEqual("123px");
    expect(chart.style.width).toEqual("234px");
    const group1 = [points[0], points[1]];
    const group2 = [points[2], points[3]];
    // Ensure at right location
    expect(group1).toMatchObject([
      { left: 0, top: 0 },
      { left: 0, top: 10 },
    ]);
    expect(group2).toMatchObject([
      { left: 90, top: 100 },
      { left: 100, top: 100 },
    ]);

    // Ensure consistent group color within group
    expect(group1[0].color).toEqual(group1[1].color);
    expect(group2[0].color).toEqual(group2[1].color);

    // Ensure different group color across groups
    expect(group1[0].color).not.toEqual(group2[0].color);
  });

  async function renderCluster(dataset: { lng: number; lat: number }[]) {
    const { render, screen } = await createDOM();
    const clusters = cluster(dataset, 5, 1);
    await render(<Cluster dataset={clusters} height={123} width={234} />);
    const chart = screen.querySelector(".cluster-container") as HTMLElement;
    const points = (
      Array.from(chart.querySelectorAll("b")) as HTMLElement[]
    ).map((b) => {
      const color = b.style.borderColor;
      const left = parseInt(b.style.left);
      const top = 100 - parseInt(b.style.top);
      return { color, left, top };
    });
    return { chart, points };
  }
});
