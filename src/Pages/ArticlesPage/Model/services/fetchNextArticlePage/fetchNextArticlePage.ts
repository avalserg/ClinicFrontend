/* eslint-disable @typescript-eslint/no-invalid-void-type */
/* eslint-disable @typescript-eslint/indent */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/App/Providers/StoreProvider";
import {
  getArticlesHasMore,
  getArticlesPageIsLoading,
  getArticlesPageNum,
} from "../../selectors/articlesPageSelectors";
import { articlesPageActions } from "../../slices/articlesPageSlice";
import { fetchArticlesList } from "../fetchArticlesList/fetchArticlesList";

export const fetchNextArticlePage = createAsyncThunk<
  void,
  void,
  ThunkConfig<string>
>("articlesPage/fetchNextArticlePage", async (_, thunkApi) => {
  const { dispatch, getState } = thunkApi;
  const hasMore = getArticlesHasMore(getState());

  const page = getArticlesPageNum(getState());
  const isLoading = getArticlesPageIsLoading(getState());
  // bad solution when page === 5
  if (hasMore && !isLoading) {
    dispatch(articlesPageActions.setPage(page + 1));
    void dispatch(fetchArticlesList({}));
  }
});
