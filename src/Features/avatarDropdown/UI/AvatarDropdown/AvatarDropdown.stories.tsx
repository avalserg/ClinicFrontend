import type { Meta, StoryObj } from "@storybook/react";
import { AvatarDropdown } from "./AvatarDropdown";
import { StoreDecorator } from "@/Shared/Config/storybook/StoreDecorator/StoreDecorator";

const meta = {
  title: "Features/AvatarDropdown",
  component: AvatarDropdown,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {},
} satisfies Meta<typeof AvatarDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: {},
};
Normal.decorators = [StoreDecorator({})];
