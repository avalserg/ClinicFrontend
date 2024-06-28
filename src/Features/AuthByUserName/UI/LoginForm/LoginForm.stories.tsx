import type { Meta, StoryObj } from "@storybook/react";
import LoginForm from "./LoginForm";
import { StoreDecorator } from "@/Shared/Config/storybook/StoreDecorator/StoreDecorator";

const meta = {
  title: "Features/LoginForm",
  component: LoginForm,
  argTypes: {},
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
Primary.decorators = [
  StoreDecorator({
    loginForm: { login: "123", password: "asd" },
  }),
];
export const withError: Story = {};
withError.decorators = [
  StoreDecorator({
    loginForm: { login: "123", password: "asd", error: "Err" },
  }),
];
export const Loading: Story = {};
Loading.decorators = [
  StoreDecorator({
    loginForm: { isLoading: true },
  }),
];
