import { StoryFn } from "@storybook/react";
import { Suspense } from "react";
// for coponents with lasy loading
export const SuspenseDecorator = (StoryComoponent: StoryFn) => (
  <Suspense>
    <StoryComoponent />
  </Suspense>
);
