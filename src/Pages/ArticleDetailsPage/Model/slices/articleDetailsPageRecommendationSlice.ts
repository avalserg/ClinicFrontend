import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { StateSchema } from "@/App/Providers/StoreProvider";
import { ArticleDetailsRecommendationsSchema } from "../types/ArticleDetailsRecommendationsSchema";
import { Article } from "@/Entities/Article";
import { fetchArticleRecommendations } from "../services/fetchArticleRecommendations/fetchArticleRecommendations";

const recommendationsAdapter = createEntityAdapter<Article>({
  selectId: (article) => article.id,
});
// selector
export const getArticleRecommendations =
  recommendationsAdapter.getSelectors<StateSchema>(
    (state) =>
      state.articleDetailsPage?.recommendations ||
      recommendationsAdapter.getInitialState(),
  );
const articleDetailsPageRecommendationSlice = createSlice({
  name: "articleDetailsPageRecommendationSlice",
  initialState:
    recommendationsAdapter.getInitialState<ArticleDetailsRecommendationsSchema>(
      {
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
      },
    ),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticleRecommendations.pending, (state) => {
        state.error = undefined;

        state.isLoading = true;
      })
      .addCase(fetchArticleRecommendations.fulfilled, (state, action) => {
        state.isLoading = false;
        // add articles in state
        recommendationsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchArticleRecommendations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { reducer: articleDetailsPageRecommendationReducer } =
  articleDetailsPageRecommendationSlice;
