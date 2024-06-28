import { StateSchema } from "@/App/Providers/StoreProvider";

export const getReviewDetailsData = (state: StateSchema) =>
  state?.reviewDetails?.data;
export const getReviewDetailsIsLoading = (state: StateSchema) =>
    state?.reviewDetails?.isLoading || false;
export const getReviewDetailsError = (state: StateSchema) =>
    state?.reviewDetails?.error;
