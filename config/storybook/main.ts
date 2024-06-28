import type { StorybookConfig } from "@storybook/react-webpack5";
// import "loki/configure-react-native";
const config: StorybookConfig = {
  stories: ["../../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    {
      name: "@storybook/addon-essentials",
      options: {
        background: false,
      },
    },
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
    "@storybook/addon-actions",
    "storybook-addon-mock",
    "storybook-addon-themes",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {
      builder: {
        useSWC: true,
      },
    },
  },
  // for React is Not defined
  swc: () => ({
    jsc: {
      transform: {
        react: {
          runtime: "automatic",
        },
      },
    },
  }),
  docs: {
    autodocs: "tag",
  },
};
export default config;
