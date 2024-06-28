import { type Decorator } from "@storybook/react";
import { Theme } from "@/Shared/const/theme";

export const ThemeDecorator =
  (theme: Theme): Decorator =>
  (Story) => (
    <div className={`app ${theme}`}>
      <Story />
    </div>
  );
