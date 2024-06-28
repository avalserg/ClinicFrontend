import type { Meta, StoryObj } from "@storybook/react";
import { EditableProfileCardHeader } from "./EditableProfileCardHeader";
import { StoreDecorator } from "@/Shared/Config/storybook/StoreDecorator/StoreDecorator";

const meta = {
  title: "Features/editableProfileCard/EditableProfileCardHeader",
  component: EditableProfileCardHeader,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {},
} satisfies Meta<typeof EditableProfileCardHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: {},
};
Normal.decorators = [StoreDecorator({})];
