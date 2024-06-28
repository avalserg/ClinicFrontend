import { Article } from "@/Entities/Article";
import { rtkApi } from "@/Shared/API/rtkApi";
// запрос данных
// для запо=росв query для изменеия mutation
const recommendationsApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getArticleRecommendationsList: build.query<Article[], number>({
      query: (limit) => ({
        url: "/articles",
        params: {
          _limit: limit,
          _expand: "user",
        },
      }),
    }),
    // createArticleRecommendation: build.mutation({
    //   query: (limit) => ({
    //     url: "/articles",
    //     params: {
    //       _limit: limit,
    //     },
    //     method: "POST",
    //   }),
    // }),
  }),
});
// useGetArticleRecommendationsListQuery create automatically
export const useArticleRecommendationsList =
  recommendationsApi.useGetArticleRecommendationsListQuery;
// export const useCreateRecommendation =
//   recommendationsApi.useCreateArticleRecommendationMutation;
