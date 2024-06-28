import { StateSchema } from '@/App/Providers/StoreProvider';

export const getCountPatientTicketsOnMonthPerYear = (state: StateSchema) =>
    state?.countPatientTicketsOnMonthPerYear?.value || undefined;
