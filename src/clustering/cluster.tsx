import { component$, useStyles$ } from "@builder.io/qwik";
import { Clusters } from "./clustering";
import STYLE from "./cluster.css?inline";

export interface ClusterProps {
  dataset: Clusters;
  width: number;
  height: number;
  size?: number;
}

export default component$<ClusterProps>(({ dataset, width, height, size }) => {
  useStyles$(STYLE);
  return (
    <div
      class="cluster-container"
      style={{
        height: height + "px",
        width: width + "px",
        "--size": (size || 1) + "px",
      }}
    >
      {dataset.clusters.map((cluster, i) =>
        cluster.data.map((loc) => (
          <b
            style={{
              left: computePos(dataset.lngMin, dataset.lngMax, loc.lng),
              top: computePos(-dataset.latMax, -dataset.latMin, -loc.lat),
              "--color": COLORS[i % COLORS.length],
            }}
          />
        ))
      )}
    </div>
  );
});

function computePos(min: number, max: number, value: number): string {
  return Math.floor(10000 * ((value - min) / (max - min))) / 100 + "%";
}

const COLORS = [
  "#CD5C5C",
  "#00FF7F",
  "#C71585",
  "#FF0000",
  "#9ACD32",
  "#A9A9A9",
  "#8B0000",
  "#FAF0E6",
  "#FFA07A",
  "#F0FFF0",
  "#32CD32",
  "#E9967A",
  "#ADD8E6",
  "#D2B48C",
  "#F5F5DC",
  "#FFC0CB",
  "#AFEEEE",
  "#EEE8AA",
  "#4682B4",
  "#008000",
  "#ADFF2F",
  "#FAEBD7",
  "#4169E1",
  "#008B8B",
  "#0000CD",
  "#FF69B4",
  "#1E90FF",
  "#8B4513",
  "#FFFFE0",
  "#EE82EE",
  "#FFD700",
  "#FFF0F5",
  "#98FB98",
  "#D8BFD8",
  "#DCDCDC",
  "#40E0D0",
  "#7B68EE",
  "#A52A2A",
  "#D2691E",
  "#20B2AA",
  "#FF00FF",
  "#CD853F",
  "#FF4500",
  "#FFA500",
  "#C0C0C0",
  "#6495ED",
  "#2E8B57",
  "#7FFFD4",
  "#FFF5EE",
  "#FFFF00",
  "#0000FF",
  "#DAA520",
  "#FFEBCD",
  "#FA8072",
  "#8B008B",
  "#5F9EA0",
  "#F4A460",
  "#BC8F8F",
  "#483D8B",
  "#4B0082",
  "#800080",
  "#191970",
  "#87CEFA",
  "#7B68EE",
  "#F08080",
  "#BA55D3",
  "#808000",
  "#FFE4E1",
  "#00FF00",
  "#F8F8FF",
  "#FFFAF0",
  "#00008B",
  "#FF1493",
  "#F5FFFA",
  "#FF00FF",
  "#FDF5E6",
  "#696969",
  "#F0F8FF",
  "#00FFFF",
  "#FFB6C1",
  "#FAFAD2",
  "#00CED1",
  "#90EE90",
  "#9932CC",
  "#B0C4DE",
  "#FFDEAD",
  "#000000",
  "#00BFFF",
  "#00FA9A",
  "#7CFC00",
  "#FFFACD",
  "#FFE4C4",
  "#FF7F50",
  "#DEB887",
  "#FFFAFA",
  "#708090",
  "#87CEEB",
  "#B8860B",
  "#F5DEB3",
  "#2F4F4F",
];
