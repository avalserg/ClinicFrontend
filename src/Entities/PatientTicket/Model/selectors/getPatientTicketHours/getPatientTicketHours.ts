import { type StateSchema } from "@/App/Providers/StoreProvider";

export const getPatientTicketHours = (state: StateSchema) =>
    state?.patienTicketDetails?.hoursAppointment || '';
