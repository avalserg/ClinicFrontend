import { Preview } from "@storybook/react";
import { themes } from "@storybook/theming";
import { ThemeDecorator } from "../../src/Shared/Config/storybook/ThemeDecorator/ThemeDecorator";
import { StyleDecorator } from "../../src/Shared/Config/storybook/StyleDecorator/StyleDecorator";
import { SuspenseDecorator } from "../../src/Shared/Config/storybook/SuspenseDecorator/SuspenseDecorator";
import { Theme } from "../../src/Shared/const/theme";
import { RouterDecorator } from "../../src/Shared/Config/storybook/RouterDecorator/RouterDecorator";
import { FeaturesFlagsDecorator } from "../../src/Shared/Config/storybook/FeaturesFlags/FeaturesFlagsDecorator";
import { NewDesignDecorator } from "../../src/Shared/Config/storybook/NewDesignDecorator/NewDesignDecorator";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#ffffff" },
        { name: "dark", value: "#000000" },
        { name: "orange", value: "#3b5998" },
      ],
      docs: {
        theme: themes.dark,
      },
    },
    layout: "fullscreen",
  },
  decorators: [
    ThemeDecorator(Theme.LIGHT),
    StyleDecorator,
    RouterDecorator,
    SuspenseDecorator,
    FeaturesFlagsDecorator({}),
    NewDesignDecorator,
  ],
};

export default preview;
