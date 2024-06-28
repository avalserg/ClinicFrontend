import { FeatureFlags } from "@/Shared/Types/featureFlags";
import { LOCAL_STORAGE_LAST_DESIGN_KEY } from "@/Shared/const/localStorage";

const defaultFeatures: FeatureFlags = {
  isAppRedesigned:
    localStorage.getItem(LOCAL_STORAGE_LAST_DESIGN_KEY) === "new",
};
// features not changin during session
let featureFlags: FeatureFlags = {
  ...defaultFeatures,
};

// context
// state Redux
// reloadPage
// костыль force update
export function setFeatureFlags(newFeatureFalgs?: FeatureFlags) {
  if (newFeatureFalgs) {
    featureFlags = newFeatureFalgs;
  }
}

export function getFeatureFlag(flag: keyof FeatureFlags) {
  return featureFlags[flag];
}

export function getAllFeatureFlags() {
  return featureFlags;
}
