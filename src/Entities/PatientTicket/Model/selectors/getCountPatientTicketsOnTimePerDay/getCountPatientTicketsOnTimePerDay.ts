import { StateSchema } from '@/App/Providers/StoreProvider';

export const getCountPatientTicketsOnTimePerDay = (state: StateSchema) =>
    state?.countPatientTicketsOnTimePerDay?.value || undefined;
