import { StateSchema } from '@/App/Providers/StoreProvider';

export const getPrescriptionsPageIsLoading = (state: StateSchema) =>
    state.prescriptionsPage?.isLoading || false;
export const getPrescriptionssPageError = (state: StateSchema) =>
    state.prescriptionsPage?.error;
export const getPrescriptionsPageData = (state: StateSchema) =>
    state.prescriptionsPage?.data || undefined;

