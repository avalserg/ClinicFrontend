import type { Meta, StoryObj } from "@storybook/react";
import { ArticleSortSelector } from "./ArticleSortSelector";
import { ArticleSortField } from "@/Entities/Article";

const meta = {
  title: "Features/ArticleSortSelector",
  component: ArticleSortSelector,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {},
} satisfies Meta<typeof ArticleSortSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: { order: "asc", sort: ArticleSortField.TITLE },
};
