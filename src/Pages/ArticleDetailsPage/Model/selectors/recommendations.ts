import { StateSchema } from "@/App/Providers/StoreProvider";

export const getArticleRecommendationsIsLoading = (state: StateSchema) =>
  state.articleDetailsPage?.recommendations?.isLoading;
export const getArticleRecommendationsError = (state: StateSchema) =>
  state.articleDetailsPage?.recommendations?.error;
