import { AdminProfile, Profile } from "@/Entities/Profile";
import { ValidateProfileError } from "../../consts/consts";

export const validateProfileData = (profile?: Profile) => {
  if (!profile) {
    return [ValidateProfileError.NO_DATA];
  }
  const { firstName,lastName, patronymic, dateBirthday, address, phoneNumber  } = profile;
  const errors: ValidateProfileError[] = [];
  if (!firstName) {
    errors.push(ValidateProfileError.INCORRECT_FIRST_NAME);
  }
  if (!lastName) {
    errors.push(ValidateProfileError.INCORRECT_LAST_NAME);
  }
  if (!patronymic) {
    errors.push(ValidateProfileError.INCORRECT_PATRONYMIC);
  }
  if (!dateBirthday) {
    errors.push(ValidateProfileError.INCORRECT_DATE_BIRTHDAY);
  }
  if (!address) {
    errors.push(ValidateProfileError.INCORRECT_ADDRESS);
  }
  if (!phoneNumber?.value) {
    errors.push(ValidateProfileError.INCORRECT_PHONE_NUMBER);
  }
  return errors;
};
export const validateAdminProfileData = (profile?: AdminProfile) => {
  if (!profile) {
    return [ValidateProfileError.NO_DATA];
  }
  const { firstName,lastName, patronymic} = profile;
  const errors: ValidateProfileError[] = [];
  if (!firstName) {
    errors.push(ValidateProfileError.INCORRECT_FIRST_NAME);
  }
  if (!lastName) {
    errors.push(ValidateProfileError.INCORRECT_LAST_NAME);
  }
  if (!patronymic) {
    errors.push(ValidateProfileError.INCORRECT_PATRONYMIC);
  }
  
  return errors;
};
