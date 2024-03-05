import { StorybookConfig } from "storybook-framework-qwik";

const config: StorybookConfig = {
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  framework: {
    name: "storybook-framework-qwik",
  },
  core: {
    renderer: "storybook-framework-qwik",
  },
  stories: [
    // ...rootMain.stories,
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)",
  ],

  viteFinal: async (config: any) => {
    return config;
  },
};

export default config;
