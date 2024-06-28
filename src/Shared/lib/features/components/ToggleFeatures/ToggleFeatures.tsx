import { ReactElement } from "react";
import { FeatureFlags } from "@/Shared/Types/featureFlags";
import { getFeatureFlag } from "../../lib/setGetFeatures";

interface ToggleFeaturesProps {
  feature: keyof FeatureFlags;
  on: ReactElement;
  off: ReactElement;
}

export const ToggleFeatures = (props: ToggleFeaturesProps) => {
  const { on, off, feature } = props;

  if (getFeatureFlag(feature)) {
    return on;
  }
  return off;
};
