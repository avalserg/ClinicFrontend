import { TestAsyncThunk } from "@/Shared/lib/tests/TestAsyncThunk/TestAsyncThunk";
import { fetchNextArticlePage } from "./fetchNextArticlePage";
import { fetchArticlesList } from "../fetchArticlesList/fetchArticlesList";

jest.mock("../fetchArticlesList/fetchArticlesList");
describe("fetchNextArticlePage.test", () => {
  test("success", async () => {
    const thunk = new TestAsyncThunk(fetchNextArticlePage, {
      articlesPage: {
        page: 2,
        ids: [],
        entities: {},
        limit: 5,
        isLoading: false,
        hasMore: true,
      },
    });
    await thunk.callThunk();
    expect(thunk.dispatch).toHaveBeenCalledTimes(4);
    expect(fetchArticlesList).toHaveBeenCalled();
  });
  test("fetch ArticleList not called", async () => {
    const thunk = new TestAsyncThunk(fetchNextArticlePage, {
      articlesPage: {
        page: 2,
        ids: [],
        entities: {},
        limit: 5,
        isLoading: false,
        hasMore: false,
      },
    });
    await thunk.callThunk();
    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(fetchArticlesList).not.toHaveBeenCalled();
  });
});
