import { StateSchema } from '@/App/Providers/StoreProvider';

export const getReviewsPageIsLoading = (state: StateSchema) =>
    state.reviewsPage?.isLoading || false;
export const getReviewsPageError = (state: StateSchema) =>
    state.reviewsPage?.error;
export const getReviewsData = (state: StateSchema) =>
    state.reviewsPage?.data || undefined;
export const getReviewDescription = (state: StateSchema) =>
    state.review?.description;
