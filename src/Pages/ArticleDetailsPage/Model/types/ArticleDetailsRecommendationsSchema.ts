import { EntityState } from "@reduxjs/toolkit";
import { Article } from "@/Entities/Article";

export interface ArticleDetailsRecommendationsSchema
  extends EntityState<Article> {
  isLoading?: boolean;
  error?: string;
}
