import type { Meta, StoryObj } from "@storybook/react";
import { NotificationButton } from "./NotificationButton";
import { StoreDecorator } from "@/Shared/Config/storybook/StoreDecorator/StoreDecorator";

const meta = {
  title: "Features/NotificationButton",
  component: NotificationButton,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {},
} satisfies Meta<typeof NotificationButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: {},
};
Normal.decorators = [StoreDecorator({})];
