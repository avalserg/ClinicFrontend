import { ArticleDetailsCommentsSchema } from "./Model/types/ArticleDetailsCommentsSchema";
import { ArticleDetailsRecommendationsSchema } from "./Model/types/ArticleDetailsRecommendationsSchema";

export { ArticleDetailsPageAsync as ArticleDetailsPage } from "./UI/ArticleDetailsPage/ArticleDetailsPage.async";
export { articleDetailsPageReducer } from "./Model/slices/index";
export interface ArticleDetailsPageSchema {
  comments: ArticleDetailsCommentsSchema;
  recommendations: ArticleDetailsRecommendationsSchema;
}
