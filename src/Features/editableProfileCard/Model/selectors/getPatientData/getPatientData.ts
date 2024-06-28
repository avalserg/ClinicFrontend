import { type StateSchema } from '@/App/Providers/StoreProvider';

export const getPatientProfileData = (state: StateSchema) => state.patient?.data;
