import { StoryFn } from "@storybook/react";
import { FeatureFlags } from "@/Shared/Types/featureFlags";
import { setFeatureFlags } from "@/Shared/lib/features";

export const FeaturesFlagsDecorator =
  (features: FeatureFlags) => (StoryComoponent: StoryFn) => {
    setFeatureFlags(features);
    return <StoryComoponent />;
  };
