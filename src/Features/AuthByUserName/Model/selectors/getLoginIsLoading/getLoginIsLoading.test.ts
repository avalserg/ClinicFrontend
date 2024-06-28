import { StateSchema } from "@/App/Providers/StoreProvider";

import { getLoginIsLoading } from "./getLoginIsLoading";

describe("getLoginIsLoadingTest", () => {
  test("should return true", () => {
    const state: DeepPartial<StateSchema> = {
      loginForm: {
        isLoading: true,
      },
    };
    expect(getLoginIsLoading(state as StateSchema)).toEqual(true);
  });
  test("should work with empty state", () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getLoginIsLoading(state as StateSchema)).toEqual(false);
  });
});
