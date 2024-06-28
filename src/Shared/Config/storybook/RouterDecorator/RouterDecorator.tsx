import { StoryFn } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";

export const RouterDecorator = (StoryComoponent: StoryFn) => (
  <BrowserRouter>
    <StoryComoponent />
  </BrowserRouter>
);
