/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useTranslation } from "react-i18next";
import { memo } from "react";
import { classNames } from "@/Shared/lib/classNames/classNames";
import { ArticleList } from "@/Entities/Article";
import { Text } from "@/Shared/UI/Text";
import { VStack } from "@/Shared/UI/Stack";
import { useArticleRecommendationsList } from "../../api/articleRecommendationsApi";

interface ArticleRecommendationListProps {
  className?: string;
}
// RTQ Query
export const ArticleRecommendationList = memo(
  (props: ArticleRecommendationListProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const {
      isLoading,
      // override destruktorization
      data: articles,
      error,
    } = useArticleRecommendationsList(3);
    console.log(articles);
    // отрисовыватьт заглушку
    if (isLoading || error || !articles) {
      return null;
    }
    return (
      <VStack
        data-testid={"ArticleRecommendationList"}
        gap={"8"}
        className={classNames("", {}, [className])}
      >
        <Text size={"l"} title={t("Рекомендуем")} />

        <ArticleList articles={articles} target="_blank" />
      </VStack>
    );
  },
);
