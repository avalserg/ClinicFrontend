import type { Meta, StoryObj } from "@storybook/react";
import { ArticleViewSelector } from "./ArticleViewSelector";
import { ArticleView } from "@/Entities/Article";

const meta = {
  title: "Entities/Article/ArticleViewSelector",
  component: ArticleViewSelector,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {},
} satisfies Meta<typeof ArticleViewSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: { view: ArticleView.BIG },
};
