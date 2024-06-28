import type { Meta, StoryObj } from "@storybook/react";

import { ThemeDecorator } from "@/Shared/Config/storybook/ThemeDecorator/ThemeDecorator";
import { SideBar } from "./SideBar";
import { StoreDecorator } from "@/Shared/Config/storybook/StoreDecorator/StoreDecorator";
import { Theme } from "@/Shared/const/theme";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Widgets/SideBar",
  component: SideBar,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
} satisfies Meta<typeof SideBar>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Light: Story = {};
Light.decorators = [
  StoreDecorator({
    applicationUser: {
      // authData: {},
    },
  }),
];
export const Dark: Story = {};
Dark.decorators = [
  ThemeDecorator(Theme.DARK),
  StoreDecorator({
    applicationUser: { // authData: {}
    },
  }),
];

export const NoAuth: Story = {};
NoAuth.decorators = [
  StoreDecorator({
    applicationUser: {},
  }),
];
