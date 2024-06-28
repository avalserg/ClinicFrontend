import { Profile } from "@/Entities/Profile";
import { ValidateCreatePatientError } from "../../consts/consts";
import { RegisterPatientSchema } from "../../types/registerPatientSchema";

export const validateCreatePatientDataData = (profile?:RegisterPatientSchema ) => {
  if (!profile) {
    return [ValidateCreatePatientError.NO_DATA];
  }
  const { firstName,lastName, patronymic, dateBirthday, address, phoneNumber,login,password, passport  } = profile;
  const errors: ValidateCreatePatientError[] = [];
  if (!firstName||firstName.length<2) {
    errors.push(ValidateCreatePatientError.INCORRECT_FIRST_NAME);
  }
  if (!lastName||lastName.length<2) {
    errors.push(ValidateCreatePatientError.INCORRECT_LAST_NAME);
  }
  if (!patronymic||patronymic.length<2) {
    errors.push(ValidateCreatePatientError.INCORRECT_PATRONYMIC);
  }
  if (!dateBirthday) {
    errors.push(ValidateCreatePatientError.INCORRECT_DATE_BIRTHDAY);
  }
  if (!address) {
    errors.push(ValidateCreatePatientError.INCORRECT_ADDRESS);
  }
  
  // eslint-disable-next-line max-len
  if (!phoneNumber||phoneNumber.length!==13||!/^\d+$/.test(phoneNumber.substring(1,phoneNumber.length) as string)||!phoneNumber.startsWith("+")) {
    errors.push(ValidateCreatePatientError.INCORRECT_PHONE_NUMBER);
  }
  if (!login) {
    errors.push(ValidateCreatePatientError.INCORRECT_LOGIN);
  }
  if (!password) {
    errors.push(ValidateCreatePatientError.INCORRECT_PASSWORD);
  }
  if (!passport) {
    errors.push(ValidateCreatePatientError.INCORRECT_PASSPORT);
  }
  return errors;
};
