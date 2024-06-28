/* eslint-disable @typescript-eslint/no-invalid-void-type */
/* eslint-disable @typescript-eslint/indent */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/App/Providers/StoreProvider";
import { Article } from "../../types/article";

export const fetchArticleById = createAsyncThunk<
  Article,
  string | undefined,
  ThunkConfig<string>
>("articleDetails/fetchArticleById", async (articleId, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;

  try {
    if (!articleId) {
      throw new Error("");
    }
    // path articles from db.json / mean 1 article without / many articles
    const response = await extra.api.get<Article>(`/articles/${articleId}`, {
      // for returning all the inforn=mation about user
      params: {
        _expand: "user",
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
