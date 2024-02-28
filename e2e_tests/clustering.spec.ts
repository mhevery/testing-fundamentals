import { test, expect, Page } from "@playwright/test";

test("has title", async ({ page }) => {
  const clusterPage = new ClusterPage(page);
  await clusterPage.goto();
  expect(await clusterPage.title).toMatch(
    /Chicago Traffic Accidents Clustering/
  );
});

test("it prints current parameters", async ({ page }) => {
  const clusterPage = new ClusterPage(page);
  await clusterPage.goto({
    size: 100,
    distance: 10,
    minClusterSize: 1,
  });
  await expect(clusterPage.size).toHaveText("100");
  await expect(clusterPage.distance).toHaveText("10");
  await expect(clusterPage.minClusterSize).toHaveText("1");
});

test("it can change cluster parameters", async ({ page }) => {
  const clusterPage = new ClusterPage(page);
  await clusterPage.goto();
  await clusterPage.setClusterParams(2000, 200, 2);
  await expect(clusterPage.size).toHaveText("2000");
  await expect(clusterPage.distance).toHaveText("200");
  await expect(clusterPage.minClusterSize).toHaveText("2");
});

test("it should error on wrong values", async ({ page }) => {
  const clusterPage = new ClusterPage(page);
  await clusterPage.goto();
  await clusterPage.setClusterParams(0, 0, 0);
  await expect(clusterPage.sizeError).toHaveText("Size must be at least 10");
  await expect(clusterPage.distanceError).toHaveText(
    "Distance must be at least 100"
  );
  await expect(clusterPage.minClusterSizeError).toHaveText(
    "Minimum cluster size must be at least 1"
  );
});

class ClusterPage {
  constructor(public page: Page) {}

  async goto(
    params: { size?: number; distance?: number; minClusterSize?: number } = {}
  ) {
    const url = new URL("http://localhost:5173/clustering/");
    if (params.size) url.searchParams.set("size", params.size.toString());
    if (params.distance)
      url.searchParams.set("distance", params.distance.toString());
    if (params.minClusterSize)
      url.searchParams.set("minClusterSize", params.minClusterSize.toString());
    return await this.page.goto(url.toString());
  }

  async setClusterParams(
    size: number,
    distance: number,
    minClusterSize: number
  ) {
    await this.page.fill('input[name="size"]', size.toString());
    await this.page.fill('input[name="distance"]', distance.toString());
    await this.page.fill(
      'input[name="minClusterSize"]',
      minClusterSize.toString()
    );
    await this.page.click('button[type="submit"]');
  }

  async getClusterCount() {
    return await this.page.textContent(".cluster-count");
  }

  get title() {
    return this.page.title();
  }

  get size() {
    return this.page.locator("span.size");
  }
  get sizeError() {
    return this.page.locator(".error.size");
  }
  get distance() {
    return this.page.locator("span.distance");
  }
  get distanceError() {
    return this.page.locator(".error.distance");
  }
  get minClusterSize() {
    return this.page.locator("span.min-cluster-size");
  }
  get minClusterSizeError() {
    return this.page.locator(".error.minClusterSize");
  }
}
