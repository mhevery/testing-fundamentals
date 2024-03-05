import { Meta, StoryObj } from "storybook-framework-qwik/*";
import Cluster, { ClusterProps } from "./cluster";
import { cluster } from "./clustering";

export default {
  component: Cluster,
  argTypes: {},
} as Meta<ClusterProps>;

type Story = StoryObj<ClusterProps>;

const squareDataset = cluster(
  [
    { lng: 0, lat: 0 },
    { lng: 0, lat: 1 },
    { lng: 1, lat: 0 },
    { lng: 1, lat: 1 },
  ],
  10,
  2
);

const diagonalDataset = cluster(
  [
    { lng: 0, lat: 0 },
    { lng: 1, lat: 1 },
    { lng: 2, lat: 2 },
    { lng: 3, lat: 3 },
  ],
  1,
  1
);

export const Square: Story = {
  args: {
    dataset: squareDataset,
    width: 250,
    height: 250,
    size: 20,
  },
  render: (props) => <Cluster {...props} />,
};

export const Diagonal: Story = {
  args: {
    dataset: diagonalDataset,
    width: 200,
    height: 200,
    size: 20,
  },
  render: (props) => <Cluster {...props} />,
};
