import { $ } from "@builder.io/qwik";
import type { Meta, StoryObj } from "storybook-framework-qwik";
import { Button, type ButtonProps } from "./button";
import { action } from "@storybook/addon-actions";

const meta: Meta<ButtonProps> = {
  component: Button,
  argTypes: {},
};

type Story = StoryObj<ButtonProps>;

export default meta;

const actions: ButtonProps = {
  onClick$: $(action("click")),
};

export const Primary: Story = {
  args: {
    ...actions,
    size: "medium",
  },
  render: (props) => <Button {...props}>Some button!</Button>,
};

export const Secondary: Story = {
  args: {
    ...actions,
    size: "small",
  },
  render: (props) => <Button {...props}>Some other button.</Button>,
};
