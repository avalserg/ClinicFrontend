import type { Meta, StoryObj } from "@storybook/react";
import ArticleEditPage from "./ArticleEditPage";
import { StoreDecorator } from "@/Shared/Config/storybook/StoreDecorator/StoreDecorator";

const meta = {
  title: "Pages/ArticleEditPage/ArticleEditPage",
  component: ArticleEditPage,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {},
} satisfies Meta<typeof ArticleEditPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: {},
};
Normal.decorators = [StoreDecorator({})];
