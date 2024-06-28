import { StateSchema } from '@/App/Providers/StoreProvider';

export const getMedicalCardsPageIsLoading = (state: StateSchema) =>
    state.medicalCardsPage?.isLoading || false;
export const getMedicalCardsPagePageError = (state: StateSchema) =>
    state.medicalCardsPage?.error;
export const getMedicalCardsPageData = (state: StateSchema) =>
    state.medicalCardsPage?.data || undefined;
