import clusterAlgo from "density-clustering";
import DATASET from "./dataset.json";
import type { Location } from "./dataset.json";
export type { Location } from "./dataset.json";

export function loadDataset() {
  return DATASET;
}

const RADIUS_METERS = 300;
const EARTH_CIRCUMFERENCE_METERS = 40075 * 1000;
const METERS_PER_DEGREE = EARTH_CIRCUMFERENCE_METERS / 360;
const NEIGHBORHOOD_RADIUS = convertDistanceToDegrees(RADIUS_METERS);
export function convertDistanceToDegrees(distance: number): number {
  return distance / METERS_PER_DEGREE;
}

export interface Cluster {
  latMin: number;
  latMax: number;
  lngMin: number;
  lngMax: number;
  data: Location[];
}

export interface Clusters {
  latMin: number;
  latMax: number;
  lngMin: number;
  lngMax: number;
  clusters: Cluster[];
}

export function cluster(
  dataset: Location[],
  distance: number = NEIGHBORHOOD_RADIUS,
  minClusterSize: number = 10
): Clusters {
  const clusteringAlgorithm = new clusterAlgo.DBSCAN();
  const data = dataset.map(({ lat, lng }) => [lat, lng]);
  const start = performance.now();
  const rawClusters = clusteringAlgorithm.run(data, distance, minClusterSize);
  const end = performance.now();
  console.log("cluster time", end - start);
  let latMin = Number.MAX_SAFE_INTEGER;
  let latMax = Number.MIN_SAFE_INTEGER;
  let lngMin = Number.MAX_SAFE_INTEGER;
  let lngMax = Number.MIN_SAFE_INTEGER;

  const clusters: Cluster[] = rawClusters.map((cluster) => {
    let data: Location[] = [];
    let cLatMin = Number.MAX_SAFE_INTEGER;
    let cLatMax = Number.MIN_SAFE_INTEGER;
    let cLngMin = Number.MAX_SAFE_INTEGER;
    let cLngMax = Number.MIN_SAFE_INTEGER;
    cluster.forEach((idx) => {
      const pos = dataset[idx];
      cLatMin = Math.min(cLatMin, pos.lat);
      cLatMax = Math.max(cLatMax, pos.lat);
      cLngMin = Math.min(cLngMin, pos.lng);
      cLngMax = Math.max(cLngMax, pos.lng);
      latMin = Math.min(latMin, pos.lat);
      latMax = Math.max(latMax, pos.lat);
      lngMin = Math.min(lngMin, pos.lng);
      lngMax = Math.max(lngMax, pos.lng);
      data.push(pos);
    });
    return {
      latMin: cLatMin,
      latMax: cLatMax,
      lngMin: cLngMin,
      lngMax: cLngMax,
      data,
    };
  });
  return {
    latMin,
    latMax,
    lngMin,
    lngMax,
    clusters,
  };
}
