import { FeatureFlags } from "@/Shared/Types/featureFlags";
import { getFeatureFlag } from "./setGetFeatures";

interface ToggleFeaturesOptions<T> {
  name: keyof FeatureFlags;
  on: () => T;
  off: () => T;
}

export function toggleFeatures<T>({
  on,
  off,
  name,
}: ToggleFeaturesOptions<T>): T {
  if (getFeatureFlag(name)) {
    return on();
  }
  return off();
}
