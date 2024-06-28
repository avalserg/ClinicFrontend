/* eslint-disable i18next/no-literal-string */
import type { Meta, StoryObj } from "@storybook/react";
import { Page } from "./Page";
import { StoreDecorator } from "@/Shared/Config/storybook/StoreDecorator/StoreDecorator";

const meta = {
  title: "Widgets/Page",
  component: Page,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {},
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  // eslint-disable-next-line i18next/no-literal-string
  args: {
    children: (
      <div>Page</div>
    ),
  },
};
Normal.decorators = [StoreDecorator({})];
