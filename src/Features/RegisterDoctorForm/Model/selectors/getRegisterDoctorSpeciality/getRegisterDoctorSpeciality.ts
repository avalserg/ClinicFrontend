import { StateSchema } from '@/App/Providers/StoreProvider';

export const getRegisterDoctorSpeciality = (state: StateSchema) =>
    state?.registerDoctor?.speciality || '';
