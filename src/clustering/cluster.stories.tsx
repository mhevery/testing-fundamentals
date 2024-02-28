import { Meta, StoryObj } from "storybook-framework-qwik/*";
import Cluster, { type ClusterProps } from "./cluster";
import { cluster } from "./clustering";

export default {
  component: Cluster,
  argTypes: {},
} as Meta<ClusterProps>;

type Story = StoryObj<ClusterProps>;

export const Square: Story = {
  args: {
    dataset: cluster(
      [
        { lng: 0, lat: 0 },
        { lng: 0, lat: 1 },
        { lng: 1, lat: 0 },
        { lng: 1, lat: 1 },
      ],
      10,
      2
    ),
    width: 250,
    height: 250,
    size: 20,
  },
  render: (props) => <Cluster {...props} />,
};

export const TwoClusters: Story = {
  args: {
    dataset: cluster(
      [
        { lng: 0, lat: 0 },
        { lng: 0, lat: 1 },
        { lng: 4, lat: 5 },
        { lng: 5, lat: 5 },
      ],
      5,
      2
    ),
    width: 250,
    height: 250,
    size: 10,
  },
  render: (props) => <Cluster {...props} />,
};

export const Diagonal: Story = {
  args: {
    dataset: cluster(
      [
        { lng: 0, lat: 0 },
        { lng: 1, lat: 1 },
        { lng: 2, lat: 2 },
        { lng: 3, lat: 3 },
      ],
      1,
      1
    ),
    width: 250,
    height: 250,
    size: 10,
  },
  render: (props) => <Cluster {...props} />,
};
