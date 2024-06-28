import { StateSchema } from "@/App/Providers/StoreProvider";
import { getLoginUsername } from "./getLoginUsername";

describe("getLoginUsernameTest", () => {
  test("should return true", () => {
    const state: DeepPartial<StateSchema> = {
      loginForm: {
        login: "admin",
      },
    };
    expect(getLoginUsername(state as StateSchema)).toEqual("admin");
  });
  test("should work with empty state", () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getLoginUsername(state as StateSchema)).toEqual("");
  });
});
