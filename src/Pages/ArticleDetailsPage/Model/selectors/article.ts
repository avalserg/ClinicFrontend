import { createSelector } from "@reduxjs/toolkit";
import { getArticleDetailsData } from "@/Entities/Article";
import { getUserAuthData } from "@/Entities/ApplicationUser";

export const getCanEditArticle = createSelector(
  getArticleDetailsData,
  getUserAuthData,
  (article, user) => {
    if (!article || !user) {
      return false;
    }
    return article.user.applicationUserId === user.applicationUserId;
  },
);
