import type { Meta, StoryObj } from "@storybook/react";
import AricleRating from "./ArticleRating";
import { StoreDecorator } from "@/Shared/Config/storybook/StoreDecorator/StoreDecorator";

const meta = {
  title: "Features/AricleRating",
  component: AricleRating,

  argTypes: {},
} satisfies Meta<typeof AricleRating>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: { articleId: "1" },
};
Normal.decorators = [
  StoreDecorator({
    applicationUser: {
      authData: {
        applicationUserId: "1",
      },
    },
  }),
];
Normal.parameters = {
  mockData: [
    {
      url: `${__API__}/article-ratings?userId=1&articleId=1`,
      method: "GET",
      status: 200,
      response: [
        {
          rate: 4,
        },
      ],
    },
  ],
};
export const WithoutRating: Story = {
  args: { articleId: "1" },
};
WithoutRating.decorators = [
  StoreDecorator({
    applicationUser: {
      authData: {
        applicationUserId: "1",
      },
    },
  }),
];
WithoutRating.parameters = {
  mockData: [
    {
      url: `${__API__}/article-ratings?userId=1&articleId=1`,
      method: "GET",
      status: 200,
      response: [],
    },
  ],
};
