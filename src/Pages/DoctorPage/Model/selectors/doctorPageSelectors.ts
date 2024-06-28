import { StateSchema } from '@/App/Providers/StoreProvider';

export const getDoctorPageIsLoading = (state: StateSchema) =>
    state.doctorPage?.isLoading || false;
export const getDoctorPageError = (state: StateSchema) => state.doctorPage?.error;
export const getDoctorPageData = (state: StateSchema) => state.doctorPage?.data || undefined;

