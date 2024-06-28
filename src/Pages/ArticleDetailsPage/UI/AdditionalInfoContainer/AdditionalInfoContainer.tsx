/* eslint-disable react/display-name */
import { memo, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getArticleDetailsData } from "@/Entities/Article";
import { Card } from "@/Shared/UI/Card";
import { ArticleAdditionalInfo } from "@/Widgets/ArticleAdditionalInfo";
import cls from "./AdditionalInfoContainer.module.scss";
import { getRouteArticleEdit } from "@/Shared/const/router";

export const AdditionalInfoContainer = memo(() => {
  const article = useSelector(getArticleDetailsData);
  const navigate = useNavigate();
  const onEditArticle = useCallback(() => {
    if (article) {
      navigate(getRouteArticleEdit(article.id));
    }
  }, [article, navigate]);
  if (!article) {
    return null;
  }
  return (
    <Card padding={"24"} border={"partialRound"} className={cls.card}>
      <ArticleAdditionalInfo
        onEdit={onEditArticle}
        author={article.user}
        createdAt={article.createdAt}
        views={article.views}
      />
    </Card>
  );
});
