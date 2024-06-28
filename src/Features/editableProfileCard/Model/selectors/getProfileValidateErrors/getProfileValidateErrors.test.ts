import { StateSchema } from "@/App/Providers/StoreProvider";
import { getProfileValidateErrors } from "./getProfileValidateErrors";
import { ValidateProfileError } from "../../consts/consts";

describe("getProfileValidateErrorsTest", () => {
  test("should return error", () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        validateErrors: [ValidateProfileError.INCORRECT_FIRST_NAME],
      },
    };
    expect(getProfileValidateErrors(state as StateSchema)).toEqual([
      ValidateProfileError.INCORRECT_FIRST_NAME,
    ]);
  });
  test("should work with empty state", () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileValidateErrors(state as StateSchema)).toEqual(undefined);
  });
});
