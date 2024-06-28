import { type StateSchema } from '@/App/Providers/StoreProvider';

export const getPatientTicketDoctorId = (state: StateSchema) =>
    state?.patienTicketDetails?.doctorId || '';
