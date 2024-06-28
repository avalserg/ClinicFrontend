export { getPatientData } from './Model/selectors/getDoctorData/getAdminData';

export { adminReducer, adminActions } from './Model/slice/adminSlice';
export type { Admin, AdminDetailsSchema } from './Model/types/admin';

export { fetchAdminById } from './Model/services/fetchAdminById';
