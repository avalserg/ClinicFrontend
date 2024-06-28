/* eslint-disable react/display-name */
import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { classNames } from "@/Shared/lib/classNames/classNames";
import { getRouteArticleEdit, getRouteArticles } from "@/Shared/const/router";
import { Button} from "@/Shared/UI/Button/Button";
import { getArticleDetailsData } from "@/Entities/Article";
import { getCanEditArticle } from "../../Model/selectors/article";
import { HStack } from "@/Shared/UI/Stack";

interface ArticleDetailsPageHeaderProps {
  className?: string;
}

export const ArticleDetailsPageHeader = memo(
  (props: ArticleDetailsPageHeaderProps) => {
    const { className } = props;
    const { t } = useTranslation("");
    const navigate = useNavigate();
    const article = useSelector(getArticleDetailsData);
    const canEdit = useSelector(getCanEditArticle);
    const onBackToList = useCallback(() => {
      navigate(getRouteArticles());
    }, [navigate]);
    const onEditArticle = useCallback(() => {
      if (article) {
        navigate(getRouteArticleEdit(article.id));
      }
    }, [article, navigate]);
    return (
      <HStack
        max
        justify={"between"}
        className={classNames("", {}, [className])}
      >
        <Button variant={"outline"} onClick={onBackToList}>
          {t("Назад к списку")}
        </Button>
        {canEdit && (
          <Button variant={"outline"} onClick={onEditArticle}>
            {t("Редактировать")}
          </Button>
        )}
      </HStack>
    );
  },
);
