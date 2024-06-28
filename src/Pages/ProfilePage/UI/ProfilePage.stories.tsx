import type { Meta, StoryObj } from "@storybook/react";

import ProfilePage from "./ProfilePage";
import { ThemeDecorator } from "@/Shared/Config/storybook/ThemeDecorator/ThemeDecorator";
import { StoreDecorator } from "@/Shared/Config/storybook/StoreDecorator/StoreDecorator";
import { Currency } from "@/Entities/Currency";
import { Country } from "@/Entities/Country";
import { Theme } from "@/Shared/const/theme";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Pages/ProfilePage",
  component: ProfilePage,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
} satisfies Meta<typeof ProfilePage>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Normal: Story = {};
Normal.decorators = [
  StoreDecorator({
    profile: {
      form: {
        first: "Alex",
        last: "Avdeyenko",
        age: 26,
        currency: Currency.USD,
        country: Country.Belarus,
        city: "Orsha",
        username: "admin",
      },
    },
  }),
];

export const Dark: Story = {};
Dark.decorators = [
  ThemeDecorator(Theme.DARK),
  StoreDecorator({
    profile: {
      form: {
        first: "Alex",
        last: "Avdeyenko",
        age: 26,
        currency: Currency.USD,
        country: Country.Belarus,
        city: "Orsha",
        username: "admin",
      },
    },
  }),
];
