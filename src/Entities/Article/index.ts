/* eslint-disable @typescript-eslint/consistent-type-exports */
export { ArticleDetails } from "./UI/ArticleDetails/ArticleDetails";
export {
  ArticleView,
  ArticleSortField,
  ArticleType,
} from "./Model/consts/articleConsts";
export type { Article } from "./Model/types/article";
export type { ArticleDetailsSchema } from "./Model/types/articleDetailsSchema";

export { ArticleList } from "./UI/ArticleList/ArticleList";
export { getArticleDetailsData } from "./Model/selectors/articleDetails";
export { articleDetailsReducer } from "./Model/slice/articleDetailsSlice";
export { ArticleBlockType } from "./Model/consts/articleConsts";
