/* eslint-disable @typescript-eslint/no-invalid-void-type */
/* eslint-disable @typescript-eslint/indent */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/App/Providers/StoreProvider";
import { getArticlesPageInited } from "../../selectors/articlesPageSelectors";
import { articlesPageActions } from "../../slices/articlesPageSlice";
import { fetchArticlesList } from "../fetchArticlesList/fetchArticlesList";
import { ArticleSortField, ArticleType } from "@/Entities/Article";
import { SortOrder } from "@/Shared/Types/sort";

export const initArticlesPage = createAsyncThunk<
  void,
  URLSearchParams,
  ThunkConfig<string>
>("articlesPage/initArticlesPage", async (searchParams, thunkApi) => {
  const { dispatch, getState } = thunkApi;
  const inited = getArticlesPageInited(getState());

  if (!inited) {
    // get params from URL
    const orderFromURL = searchParams.get("order") as SortOrder;
    const sortFromURL = searchParams.get("sort") as ArticleSortField;
    const searchFromURL = searchParams.get("search");
    const typeFromURL = searchParams.get("type") as ArticleType;

    if (orderFromURL) {
      dispatch(articlesPageActions.setOrder(orderFromURL));
    }
    if (sortFromURL) {
      dispatch(articlesPageActions.setSort(sortFromURL));
    }
    if (searchFromURL) {
      dispatch(articlesPageActions.setSearch(searchFromURL));
    }
    if (typeFromURL) {
      dispatch(articlesPageActions.setType(typeFromURL));
    }
    // vie from localStorage
    dispatch(articlesPageActions.initState());
    void dispatch(fetchArticlesList({}));
  }
});
