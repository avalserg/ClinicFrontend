/* eslint-disable @typescript-eslint/no-invalid-void-type */
/* eslint-disable @typescript-eslint/indent */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getArticleDetailsData } from "@/Entities/Article";
import { Comment } from "@/Entities/Comment";
import { getUserAuthData } from "@/Entities/ApplicationUser";
import { fetchCommentByArticleId } from "../fetchCommentByArticleId/fetchCommentByArticleId";
import { ThunkConfig } from "@/App/Providers/StoreProvider";

export const addCommentForArticle = createAsyncThunk<
  Comment,
  // text from input
  string,
  ThunkConfig<string>
>("articleDetails/addCommentForArticle", async (text, thunkApi) => {
  const { extra, dispatch, rejectWithValue, getState } = thunkApi;
  // get data from state to sent them to backend
  const userData = getUserAuthData(getState());

  const article = getArticleDetailsData(getState());
  if (!userData || !text || !article) {
    return rejectWithValue("no data");
  }
  try {
    const response = await extra.api.post<Comment>("/comments", {
      articleId: article.id,
      userId: userData,
      text,
    });
    if (!response.data) {
      throw new Error();
    }

    // for refresh page
    void dispatch(fetchCommentByArticleId(article.id));
    return response.data;
  } catch (e) {
    return rejectWithValue("error");
  }
});
