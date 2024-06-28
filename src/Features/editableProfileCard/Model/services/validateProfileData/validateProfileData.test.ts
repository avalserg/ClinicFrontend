import { validateProfileData } from "./validateProfileData";
import { Currency } from "@/Entities/Currency";
import { Country } from "@/Entities/Country";
import { ValidateProfileError } from "../../consts/consts";

const data = {
  first: "Alex",
  last: "Avdeyenko",
  age: 26,
  currency: Currency.USD,
  country: Country.Belarus,
  city: "Orsha",
  username: "admin",
};
describe("validateProfileData.test", () => {
  test("success", async () => {
    const result = validateProfileData(data);

    expect(result).toEqual([]);
  });

  test("without first and last name", async () => {
    const result = validateProfileData({ ...data, firstName:"",lastName:"", patronymic:""});

    expect(result).toEqual(
      [
        ValidateProfileError.INCORRECT_FIRST_NAME ||
        ValidateProfileError.INCORRECT_LAST_NAME ||
        ValidateProfileError.INCORRECT_PATRONYMIC]
    );
  });
  test("incorrect dateBirthday", async () => {
    const result = validateProfileData({ ...data, dateBirthday: undefined });

    expect(result).toEqual([ValidateProfileError.INCORRECT_DATE_BIRTHDAY]);
  });
  test("incorrect address", async () => {
    const result = validateProfileData({ ...data, address: undefined });

    expect(result).toEqual([ValidateProfileError.INCORRECT_ADDRESS]);
  });
  test("incorrect all", async () => {
    const result = validateProfileData({});
    // order is important
    expect(result).toEqual([
      ValidateProfileError.INCORRECT_FIRST_NAME,
      ValidateProfileError.INCORRECT_LAST_NAME,
      ValidateProfileError.INCORRECT_PATRONYMIC,
      ValidateProfileError.INCORRECT_ADDRESS,
      ValidateProfileError.INCORRECT_PHONE_NUMBER,
    ]);
  });
});
