/* eslint-disable @typescript-eslint/indent */
import { rtkApi } from "@/Shared/API/rtkApi";
import { Rating } from "@/Entities/Rating";

interface GetArticleRatingArg {
  userId: string;
  articleId: string;
}
interface RateArticleArg {
  userId: string;
  articleId: string;
  feedback?: string;
  rate: number;
}
const articleRatingApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getArticleRating: build.query<Rating[], GetArticleRatingArg>({
      query: ({ articleId, userId }) => ({
        // endpoint from db.json
        url: "/article-ratings",
        params: {
          userId,
          articleId,
        },
      }),
    }),
    // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
    rateArticle: build.mutation<void, RateArticleArg>({
      query: (arg) => ({
        // endpoint from db.json
        url: "/article-ratings",
        method: "POST",
        body: arg,
      }),
    }),
  }),
});
export const useGetArticleRating = articleRatingApi.useGetArticleRatingQuery;
export const useRateArticle = articleRatingApi.useRateArticleMutation;
