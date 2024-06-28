import { StateSchema } from "@/App/Providers/StoreProvider";

export const getCountAppointmentsData = (state: StateSchema) =>
    state?.countAppointments?.count || undefined;
