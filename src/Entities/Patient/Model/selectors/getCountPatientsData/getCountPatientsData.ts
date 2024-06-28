import { StateSchema } from '@/App/Providers/StoreProvider';

export const getCountPatientsData = (state: StateSchema) =>
    state?.countPatients?.count || undefined;
