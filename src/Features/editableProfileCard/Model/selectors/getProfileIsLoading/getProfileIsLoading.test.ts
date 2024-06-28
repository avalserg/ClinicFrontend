import { StateSchema } from "@/App/Providers/StoreProvider";
import { getProfileIsLoading } from "./getProfileIsLoading";

describe("getProfileIsLoadingTest", () => {
  test("should return true", () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        isLoading: true,
      },
    };
    expect(getProfileIsLoading(state as StateSchema)).toEqual(true);
  });
  test("should work with empty state", () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileIsLoading(state as StateSchema)).toEqual(undefined);
  });
});
