import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/App/Providers/StoreProvider";
import { JsonSettings } from "../types/jsonSettings";
import { getUserAuthData } from "../selectors/getApplicationUserAuthData/getApplicationUserAuthData";
import { getJsonSettings } from "../selectors/jsonSettings";
import { setJsonSettingsMutation } from "../../api/applicationUserApi";

export const saveJsonSettings = createAsyncThunk<
  JsonSettings,
  JsonSettings,
  ThunkConfig<string>
>("user/saveJsonSettings", async (newJsonSettings, thunkApi) => {
  const { rejectWithValue, getState, dispatch } = thunkApi;
  const userData = getUserAuthData(getState());
  const currentSettings = getJsonSettings(getState());
  if (!userData) {
    return rejectWithValue("");
  }
  try {
    const response = await dispatch(
      setJsonSettingsMutation({
        userId: userData.applicationUserId,
        jsonSettings: {
          ...currentSettings,
          ...newJsonSettings,
        },
      }),
    ).unwrap();

    if (!response.jsonSettings) {
      return rejectWithValue("");
    }
    return response.jsonSettings;
  } catch (e) {
    console.log(e);
    return rejectWithValue("");
  }
});
