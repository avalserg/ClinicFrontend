import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/App/Providers/StoreProvider";
import { FeatureFlags } from "@/Shared/Types/featureFlags";
import { updateFeatureFlagsMutation } from "../api/featureFlagsApi";
import { getAllFeatureFlags, setFeatureFlags } from "../lib/setGetFeatures";

interface UpdateFeatureFlagOptions {
  userId: string;
  newFeatures: Partial<FeatureFlags>;
}

export const updateFeatureFlag = createAsyncThunk<
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  void,
  UpdateFeatureFlagOptions,
  ThunkConfig<string>
>("features/updateFeatureFlag", async ({ userId, newFeatures }, thunkApi) => {
  const { rejectWithValue, dispatch } = thunkApi;
  const allFeatures = {
    // отправляем на backend все

    ...getAllFeatureFlags(),
    // заменяем те, которые хоти обновить

    ...newFeatures,
  };
  try {
    await dispatch(
      updateFeatureFlagsMutation({
        userId,
        features: allFeatures,
      }),
    );
    setFeatureFlags(allFeatures);
    // обновляем страницу так как флаги не реактивные и в рамках одной сессии не меняются
    window.location.reload();
    return undefined;
  } catch (e) {
    console.log(e);
    return rejectWithValue("");
  }
});
