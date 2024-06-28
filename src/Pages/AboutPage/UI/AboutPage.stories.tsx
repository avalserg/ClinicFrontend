import type { Meta, StoryObj } from "@storybook/react";

import AboutPage from "./AboutPage";
import { ThemeDecorator } from "@/Shared/Config/storybook/ThemeDecorator/ThemeDecorator";
import { StoreDecorator } from "@/Shared/Config/storybook/StoreDecorator/StoreDecorator";
import { Theme } from "@/Shared/const/theme";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Pages/AboutPage",
  component: AboutPage,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
} satisfies Meta<typeof AboutPage>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Normal: Story = {};
Normal.decorators = [StoreDecorator({}), ThemeDecorator(Theme.LIGHT)];

export const Dark: Story = {};
Dark.decorators = [StoreDecorator({}), ThemeDecorator(Theme.DARK)];
