import { combineReducers } from "@reduxjs/toolkit";
import { ArticleDetailsPageSchema } from "../..";
import { articleDetailsPageRecommendationReducer } from "./articleDetailsPageRecommendationSlice";
import { articleDetailsCommentsReducer } from "./articleDetailsCommentsSlice";

export const articleDetailsPageReducer =
  combineReducers<ArticleDetailsPageSchema>({
    recommendations: articleDetailsPageRecommendationReducer,
    comments: articleDetailsCommentsReducer,
  });
