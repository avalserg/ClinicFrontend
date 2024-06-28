/* eslint-disable @typescript-eslint/no-invalid-void-type */
/* eslint-disable @typescript-eslint/indent */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/App/Providers/StoreProvider";
import { Article, ArticleType } from "@/Entities/Article";
import {
  getArticlesPageLimit,
  getArticlesPageNum,
  getArticlesPageOrder,
  getArticlesPageSerach,
  getArticlesPageSort,
  getArticlesPageType,
} from "../../selectors/articlesPageSelectors";
import { addQueryParams } from "@/Shared/lib/hooks/url/addQueryParams/addQueryParams";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface FetchArticlesListProps {
  replace?: boolean;
}

export const fetchArticlesList = createAsyncThunk<
  Article[],
  FetchArticlesListProps,
  ThunkConfig<string>
>("articlesPage/fetchArticlesList", async (props, thunkApi) => {
  const { extra, rejectWithValue, getState } = thunkApi;
  // count elements load for 1 time get from state
  const limit = getArticlesPageLimit(getState());
  const sort = getArticlesPageSort(getState());
  const order = getArticlesPageOrder(getState());
  const search = getArticlesPageSerach(getState());
  const page = getArticlesPageNum(getState());
  const type = getArticlesPageType(getState());
  try {
    addQueryParams({
      sort,
      order,
      search,
      type,
    });
    // path articles from db.json / mean 1 article without / many articles
    const response = await extra.api.get<Article[]>(`/articles`, {
      params: {
        // получаем сущность юзера целиком для отображения аватарки и прочей инфы
        // q and so on from documentation
        _expand: "user",
        _limit: limit,
        _page: page,
        _sort: sort,
        _order: order,
        q: search,
        type: type === ArticleType.ALL ? undefined : type,
      },
    });
    if (!response.data) {
      throw new Error();
    }
    return response.data;
  } catch (e) {
    console.log(e);
    return rejectWithValue("error");
  }
});
