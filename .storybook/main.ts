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

// Storybook assumes that it is running in a browser environment, but with Qwik
// there is SSR. This is a workaround to make Storybook not complain on SSR.
(global as any).window = {};

export default config;
