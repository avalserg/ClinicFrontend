import { StateSchema } from '@/App/Providers/StoreProvider';

export const getCountDoctorData = (state: StateSchema) =>
    state?.countDoctors?.countDoctors || undefined;
