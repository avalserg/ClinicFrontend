import type { Meta, StoryObj } from "@storybook/react";
import { NotificationItem } from "./NotificationItem";

const item = { id: "1", title: "Title", description: "Description" };
const meta = {
  title: "Entities/Notification/NotificationItem",
  component: NotificationItem,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {},
} satisfies Meta<typeof NotificationItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: { item },
};
