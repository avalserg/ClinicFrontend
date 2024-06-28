import { StateSchema } from "@/App/Providers/StoreProvider";
import { getLoginError } from "./getLoginError";

describe("getLoginErrorTest", () => {
  test("should return error", () => {
    const state: DeepPartial<StateSchema> = {
      loginForm: {
        error: "error",
      },
    };
    expect(getLoginError(state as StateSchema)).toEqual("error");
  });
  test("should work with empty state", () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getLoginError(state as StateSchema)).toEqual(undefined);
  });
});
