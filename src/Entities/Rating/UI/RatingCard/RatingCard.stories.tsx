import type { Meta, StoryObj } from "@storybook/react";
import { RatingCard } from "./RatingCard";

const meta = {
  title: "Entities/Rating/RatingCard",
  component: RatingCard,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {},
} satisfies Meta<typeof RatingCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: {},
};
