import {
  PayloadAction,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { StateSchema } from "@/App/Providers/StoreProvider";
import { Comment } from "@/Entities/Comment";
import { ArticleDetailsCommentsSchema } from "../types/ArticleDetailsCommentsSchema";
import { fetchCommentByArticleId } from "../services/fetchCommentByArticleId/fetchCommentByArticleId";

const commentsAdapter = createEntityAdapter<Comment>({
  selectId: (comment: Comment) => comment.id,
});
// selector
export const getArticleComments = commentsAdapter.getSelectors<StateSchema>(
  (state) =>
    state.articleDetailsPage?.comments || commentsAdapter.getInitialState(),
);
const articleDetailsCommentsSlice = createSlice({
  name: "articleDetailsCommentsSlice",
  initialState: commentsAdapter.getInitialState<ArticleDetailsCommentsSchema>({
    isLoading: false,
    error: undefined,
    ids: [],
    entities: {},
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentByArticleId.pending, (state) => {
        state.error = undefined;

        state.isLoading = true;
      })
      .addCase(
        fetchCommentByArticleId.fulfilled,
        (state, action: PayloadAction<Comment[]>) => {
          state.isLoading = false;
          // !!
          commentsAdapter.setAll(state, action.payload);
        },
      )
      .addCase(fetchCommentByArticleId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { reducer: articleDetailsCommentsReducer } =
  articleDetailsCommentsSlice;
