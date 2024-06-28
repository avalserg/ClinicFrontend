import type { Meta, StoryObj } from "@storybook/react";
import { ArticleDetailsComments } from "./ArticleDetailsComments";
import { StoreDecorator } from "@/Shared/Config/storybook/StoreDecorator/StoreDecorator";

const meta = {
  title: "Pages/ArticleDetailsPage/ArticleDetailsComments",
  component: ArticleDetailsComments,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {},
} satisfies Meta<typeof ArticleDetailsComments>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: { id: "1" },
};
Normal.decorators = [StoreDecorator({})];
