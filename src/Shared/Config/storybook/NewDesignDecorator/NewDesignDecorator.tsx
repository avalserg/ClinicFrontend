import { StoryFn } from "@storybook/react";
import { setFeatureFlags } from "@/Shared/lib/features";
import { getAllFeatureFlags } from "@/Shared/lib/features/lib/setGetFeatures";

export const NewDesignDecorator = (StoryComoponent: StoryFn) => {
  // получаем все флаги и перезатираем isAppRedesigned
  setFeatureFlags({ ...getAllFeatureFlags(), isAppRedesigned: true });
  return (
    <div className="app_redesigned">
      <StoryComoponent />
    </div>
  );
};
