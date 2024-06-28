import { LoginSchema } from "../types/loginSchema";
import { loginActions, loginReducer } from "./loginSlice";

describe("loginSliceTest", () => {
  test("test set username", () => {
    const state: DeepPartial<LoginSchema> = { login: "123" };
    expect(
      loginReducer(state as LoginSchema, loginActions.setUserName("123123")),
    ).toEqual({ username: "123123" });
  });
  test("test set password", () => {
    const state: DeepPartial<LoginSchema> = { password: "123" };
    expect(
      loginReducer(state as LoginSchema, loginActions.setPassword("123123")),
    ).toEqual({ password: "123123" });
  });
});
