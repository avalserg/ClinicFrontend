import type { Meta, StoryObj } from "@storybook/react";

import SettingsPage from "./SettingsPage";
import { StoreDecorator } from "@/Shared/Config/storybook/StoreDecorator/StoreDecorator";

const meta = {
  title: "Pages/SettingsPage",
  component: SettingsPage,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {},
} satisfies Meta<typeof SettingsPage>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Normal: Story = {
  args: {},
};
Normal.decorators = [StoreDecorator({})];