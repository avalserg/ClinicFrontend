export { RegisterPatientFormAsync as RegisterPatientForm } from "./UI/RegisterPatientForm/RegisterPatientForm.async";

export { registerPatientReducer, registerPatientSlice } from "./Model/slice/registerPatientSlice";
export {getRegisterPatientAddress} from "./Model/selectors/getRegisterPatientAddress/getRegisterPatientAddress"
// eslint-disable-next-line max-len
export {getRegisterPatientDateBirthday} from "./Model/selectors/getRegisterPatientDateBirthday/getRegisterPatientDateBirthday"
export {getRegisterPatientError} from "./Model/selectors/getRegisterPatientError/getRegisterPatientError"
export {getRegisterPatientFirstName} from "./Model/selectors/getRegisterPatientFirstName/getRegisterPatientFirstName"
export {getRegisterPatientIsLoading} from "./Model/selectors/getRegisterPatientIsLoading/getRegisterPatientIsLoading"
export {getRegisterPatientLastName} from "./Model/selectors/getRegisterPatientLastName/getRegisterPatientLastName"
export {getRegisterPatientPassword} from "./Model/selectors/getRegisterPatientPassword/getRegisterPatientPassword"
export {getRegisterPatientPatronymic} from "./Model/selectors/getRegisterPatientPatronymic/getRegisterPatientPatronymic"
export { getRegisterPatientPhoneNumber } from "./Model/selectors/getRegisterPatientPhoneNumber/getRegisterPatientPhoneNumber"
export type {RegisterPatientSchema } from "./Model/types/registerPatientSchema"