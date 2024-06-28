import { StateSchema } from '@/App/Providers/StoreProvider';

export const getCountPatientTicketsData = (state: StateSchema) =>
    state?.countPatientTickets?.count || undefined;
