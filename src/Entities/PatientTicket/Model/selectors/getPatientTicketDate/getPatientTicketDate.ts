import { type StateSchema } from '@/App/Providers/StoreProvider';

export const getPatientTicketDate = (state: StateSchema) =>
    state?.patienTicketDetails?.dateAppointment || '';
