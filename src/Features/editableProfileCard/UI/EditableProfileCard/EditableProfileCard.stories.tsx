import type { Meta, StoryObj } from "@storybook/react";

import { EditableProfileCard } from "./EditableProfileCard";
import { StoreDecorator } from "@/Shared/Config/storybook/StoreDecorator/StoreDecorator";

const meta = {
  title: "Features/editableProfileCard/EditableProfileCard",
  component: EditableProfileCard,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {},
} satisfies Meta<typeof EditableProfileCard>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Normal: Story = {
  args: { id: "1" },
};
Normal.decorators = [StoreDecorator({})];
