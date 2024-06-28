import type { Meta, StoryObj } from "@storybook/react";

import { ThemeDecorator } from "@/Shared/Config/storybook/ThemeDecorator/ThemeDecorator";
import Navbar from "./Navbar";
import { StoreDecorator } from "@/Shared/Config/storybook/StoreDecorator/StoreDecorator";
import { Theme } from "@/Shared/const/theme";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Widgets/Navbar",
  component: Navbar,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Light: Story = {};
Light.decorators = StoreDecorator({});
export const Dark: Story = {};
Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({})];
export const AuthNavbar: Story = {};
AuthNavbar.decorators = [StoreDecorator({
  applicationUser: {
    // authData: {}
  }
})];
