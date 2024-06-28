import type { Meta, StoryObj } from "@storybook/react";
import { NotificationList } from "./NotificationList";
import { StoreDecorator } from "@/Shared/Config/storybook/StoreDecorator/StoreDecorator";

const meta = {
  title: "Entities/Notification/NotificationList",
  component: NotificationList,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {},
} satisfies Meta<typeof NotificationList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: {},
};
Normal.decorators = [StoreDecorator({})];
Normal.parameters = {
  mockData: [
    {
      url: `${__API__}/notifications`,
      method: "GET",
      status: 200,
      response: [
        {
          id: "1",
          title: "Уведомление",
          description: "Поставь лайк",
        },
        {
          id: "2",
          title: "Уведомление 2",
          description: "Поставь лайк",
        },
        {
          id: "3",
          title: "Уведомление 3",
          description: "Поставь лайк",
        },
      ],
    },
  ],
};
