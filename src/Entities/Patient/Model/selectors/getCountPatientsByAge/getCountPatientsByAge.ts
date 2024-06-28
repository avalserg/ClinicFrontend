import { StateSchema } from '@/App/Providers/StoreProvider';

export const getCountPatientsByAge = (state: StateSchema) =>
    state?.countPatientsByAge?.value || undefined;
