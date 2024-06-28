import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import AddCommentForm from "./AddCommentForm";
import { StoreDecorator } from "@/Shared/Config/storybook/StoreDecorator/StoreDecorator";
import { SuspenseDecorator } from "@/Shared/Config/storybook/SuspenseDecorator/SuspenseDecorator";

const meta = {
  title: "Features/AddCommentForm",
  component: AddCommentForm,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {},
} satisfies Meta<typeof AddCommentForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: { onSendComment: action("onSendComment") },
};
Normal.decorators = [StoreDecorator({}), SuspenseDecorator];
