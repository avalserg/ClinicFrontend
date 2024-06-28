/* eslint-disable @typescript-eslint/no-invalid-void-type */
/* eslint-disable @typescript-eslint/indent */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/App/Providers/StoreProvider";
import { Comment } from "@/Entities/Comment";

export const fetchCommentByArticleId = createAsyncThunk<
  Comment[],
  string | undefined,
  ThunkConfig<string>
>("articleDetails/fetchCommentByArticleId", async (articleId, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;
  if (!articleId) {
    return rejectWithValue("error");
  }
  try {
    // path articles from db.json / mean 1 article without / many articles
    const response = await extra.api.get<Comment[]>(`/comments`, {
      params: {
        articleId,
        // получаем сущность юзера целиком для отображения аватарки и прочей инфы
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
