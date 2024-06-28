export { getPatientData } from "./Model/selectors/getPatientData/getPatientData";

export { patientReducer, patientActions } from "./Model/slice/patientSlice";
export type { Patient, PatientDetailsSchema} from "./Model/types/patient";

export { fetchPatientById } from "./Model/services/fetchPatientById";
