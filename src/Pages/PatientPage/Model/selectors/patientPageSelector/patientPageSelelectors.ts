import { StateSchema } from '@/App/Providers/StoreProvider';

export const getPatientPageIsLoading = (state: StateSchema) =>
    state.patientPage?.isLoading || false;
export const getPatientPageError = (state: StateSchema) =>
    state.patientPage?.error;
export const getPatientPageData = (state: StateSchema) =>
    state.patientPage?.data || undefined;
