import { type StateSchema } from '@/App/Providers/StoreProvider';

export const getPatientTicketMinutes = (state: StateSchema) =>
    state?.patienTicketDetails?.minutesAppointment || '';
