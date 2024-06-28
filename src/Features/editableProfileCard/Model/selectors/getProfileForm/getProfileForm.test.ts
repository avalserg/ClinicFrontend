import { StateSchema } from "@/App/Providers/StoreProvider";
import { getProfileForm } from "./getProfileForm";
import { Currency } from "@/Entities/Currency";
import { Country } from "@/Entities/Country";

describe("getProfileFormTest", () => {
  test("should return data form", () => {
    const data = {
      first: "Alex",
      last: "Avdeyenko",
      age: 26,
      currency: Currency.USD,
      country: Country.Belarus,
      city: "Orsha",
      username: "admin",
    };
    const state: DeepPartial<StateSchema> = {
      profile: {
        form: data,
      },
    };
    expect(getProfileForm(state as StateSchema)).toEqual(data);
  });
  test("should work with empty state", () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileForm(state as StateSchema)).toEqual(undefined);
  });
});
