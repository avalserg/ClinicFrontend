import { ValidateRegisterDoctorError } from '../../consts/consts';
import { RegisterDoctorSchema } from '../../types/registerDoctorSchema';

export const validateRegisterDoctorData = (profile?: RegisterDoctorSchema) => {
    if (!profile) {
        return [ValidateRegisterDoctorError.NO_DATA];
    }

    const {
        firstName,
        lastName,
        patronymic,
        dateBirthday,
        address,
        phoneNumber,
        login,
        password,
        speciality,
        cabinetNumber,
        category,
        experience,
    } = profile;
    const errors: ValidateRegisterDoctorError[] = [];
    if (!firstName || firstName.length < 2) {
        errors.push(ValidateRegisterDoctorError.INCORRECT_FIRST_NAME);
    }
    if (!lastName || lastName.length < 2) {
        errors.push(ValidateRegisterDoctorError.INCORRECT_LAST_NAME);
    }
    if (!patronymic || patronymic.length < 2) {
        errors.push(ValidateRegisterDoctorError.INCORRECT_PATRONYMIC);
    }
    if (!dateBirthday) {
        errors.push(ValidateRegisterDoctorError.INCORRECT_DATE_BIRTHDAY);
    }
    if (!address) {
        errors.push(ValidateRegisterDoctorError.INCORRECT_ADDRESS);
    }
  
    if (
        !phoneNumber ||
        phoneNumber.length !== 13 ||
        !/^\d+$/.test(phoneNumber.substring(1, phoneNumber.length) as string) ||
        !phoneNumber.startsWith('+')
    ) {
        errors.push(ValidateRegisterDoctorError.INCORRECT_PHONE_NUMBER);
    }
    if (!login) {
        errors.push(ValidateRegisterDoctorError.INCORRECT_LOGIN);
    }
    if (!password) {
        errors.push(ValidateRegisterDoctorError.INCORRECT_PASSWORD);
    }
    if (!experience) {
        errors.push(ValidateRegisterDoctorError.INCORRECT_EXPERIENCE);
    }
    if (!cabinetNumber) {
        errors.push(ValidateRegisterDoctorError.INCORRECT_CABINET_NUMBER);
    }
  
    return errors;
};
