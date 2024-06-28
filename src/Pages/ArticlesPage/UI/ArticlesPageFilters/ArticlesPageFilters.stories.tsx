import type { Meta, StoryObj } from "@storybook/react";
import { ArticlesPageFilters } from "./ArticlesPageFilters";
import { StoreDecorator } from "@/Shared/Config/storybook/StoreDecorator/StoreDecorator";

const meta = {
  title: "Entities/Article/ArticlesPageFilters",
  component: ArticlesPageFilters,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [StoreDecorator({})],
  argTypes: {},
} satisfies Meta<typeof ArticlesPageFilters>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: {},
};
