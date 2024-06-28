/* eslint-disable @typescript-eslint/no-invalid-void-type */
/* eslint-disable @typescript-eslint/indent */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/App/Providers/StoreProvider";
import { Article } from "@/Entities/Article";

export const fetchArticleRecommendations = createAsyncThunk<
  Article[],
  void,
  ThunkConfig<string>
>("articleDetailsPage/fetchArticlesList", async (props, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  try {
    // path articles from db.json / mean 1 article without / many articles
    const response = await extra.api.get<Article[]>(`/articles`, {
      params: {
        _limit: 4,
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
