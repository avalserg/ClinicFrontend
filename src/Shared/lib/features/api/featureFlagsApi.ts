import { rtkApi } from "@/Shared/API/rtkApi";
import { FeatureFlags } from "@/Shared/Types/featureFlags";

interface UpdateFeatureFlagsOptions {
  userId: string;
  // Partial для обновления конкретных фичей
  features: Partial<FeatureFlags>;
}
const featureFlagsApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
    updateFeatureFlags: build.mutation<void, UpdateFeatureFlagsOptions>({
      query: ({ userId, features }) => ({
        // url backend db.json
        url: `/users/${userId}`,
        method: "PATCH",
        body: {
          features,
        },
      }),
    }),
  }),
});
// rtk without hook without use in the beginning name
export const updateFeatureFlagsMutation =
  featureFlagsApi.endpoints.updateFeatureFlags.initiate;
