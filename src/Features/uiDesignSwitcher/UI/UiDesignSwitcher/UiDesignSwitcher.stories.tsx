import type { Meta, StoryObj } from "@storybook/react";

import { UiDesignSwitcher } from "./UiDesignSwitcher";

const meta = {
  title: "Features/UiDesignSwitcher",
  component: UiDesignSwitcher,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {},
} satisfies Meta<typeof UiDesignSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Normal: Story = {
  args: {},
};
