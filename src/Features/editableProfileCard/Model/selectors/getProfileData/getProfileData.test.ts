import { StateSchema } from "@/App/Providers/StoreProvider";
import { getProfileData } from "./getProfileData";
import { Currency } from "@/Entities/Currency";
import { Country } from "@/Entities/Country";

describe("getProfileDataTest", () => {
  test("should return data", () => {
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
        data,
      },
    };
    expect(getProfileData(state as StateSchema)).toEqual(data);
  });
  test("should work with empty state", () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileData(state as StateSchema)).toEqual(undefined);
  });
});
