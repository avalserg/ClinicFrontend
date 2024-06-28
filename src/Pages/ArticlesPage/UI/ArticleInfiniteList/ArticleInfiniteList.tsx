/* eslint-disable react/display-name */
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { ArticleList } from "@/Entities/Article";
import { Text } from "@/Shared/UI/Text";
import {
  getArticlesPageError,
  getArticlesPageIsLoading,
  getArticlesPageView,
} from "../../Model/selectors/articlesPageSelectors";
import { getArticles } from "../../Model/slices/articlesPageSlice";

interface ArticliInfiniteListProps {
  className?: string;
}

export const ArticleInfiniteList = memo((props: ArticliInfiniteListProps) => {
  const { className } = props;
  const articles = useSelector(getArticles.selectAll);
  const isLoading = useSelector(getArticlesPageIsLoading);
  const view = useSelector(getArticlesPageView);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const error = useSelector(getArticlesPageError);
  const { t } = useTranslation();
  if (error) {
    return <Text text={t("Ошибка при загрузке статей")} />;
  }

  return (
    <ArticleList
      isLoading={isLoading}
      view={view}
      articles={articles}
      className={className}
    />
  );
});
