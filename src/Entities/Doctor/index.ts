export { getDoctorData } from './Model/selectors/getDoctorData/getDoctorData';

export { doctorReducer, doctorActions } from './Model/slice/doctorSlice';
export type { Doctor, DoctorDetailsSchema } from './Model/types/doctor';

export { fetchDoctorById } from './Model/services/fetchDoctorById';
