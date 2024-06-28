import { StateSchema } from '@/App/Providers/StoreProvider';

export const getAppointmentsPageIsLoading = (state: StateSchema) =>
    state.appointmentsPage?.isLoading || false;
export const getAppointmentsPageError = (state: StateSchema) =>
    state.appointmentsPage?.error;
export const getAppointmentsPageData = (state: StateSchema) =>
    state.appointmentsPage?.data || undefined;

