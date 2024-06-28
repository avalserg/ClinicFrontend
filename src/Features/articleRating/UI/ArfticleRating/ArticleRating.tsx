/* eslint-disable react/display-name */
import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RatingCard } from "@/Entities/Rating";
import {
  useGetArticleRating,
  useRateArticle,
} from "../../api/articleRatingApi";
import { getUserAuthData } from "@/Entities/ApplicationUser";
import { Skeleton as SkeletonRedesigned } from "@/Shared/UI/Skeleton";

export interface AricleRatingProps {
  className?: string;
  articleId: string;
}

const ArticleRating = memo((props: AricleRatingProps) => {
  const { className, articleId } = props;
  const { t } = useTranslation("");
  const userData = useSelector(getUserAuthData);
  const { data, isLoading } = useGetArticleRating({
    articleId,
    userId: userData?.applicationUserId ?? "",
  });
  // func calle mutation and object with settings
  const [rateArticleMutation] = useRateArticle();
  const Skeleton = SkeletonRedesigned;
  const handleRateArticle = useCallback(
    (starsCount: number, feedback?: string) => {
      try {
        void rateArticleMutation({
          userId: userData?.applicationUserId ?? "",
          articleId,
          rate: starsCount,
          feedback,
        });
      } catch (error) {
        console.log(error);
      }
    },
    [articleId, rateArticleMutation, userData?.applicationUserId],
  );
  const onCancel = useCallback(
    (starsCount: number) => {
      handleRateArticle(starsCount);
    },
    [handleRateArticle],
  );
  const onAccept = useCallback(
    (starsCount: number, feedback?: string) => {
      handleRateArticle(starsCount, feedback);
    },
    [handleRateArticle],
  );
  if (isLoading) {
    return <Skeleton width={"100%"} height={120} />;
  }
  const rating = data?.[0];

  return (
    <RatingCard
      onAccept={onAccept}
      onCancel={onCancel}
      rate={rating?.rate}
      className={className}
      title={t("Оцените статью")}
      feedBAckTitle={"Оставьте свой отзыв о статье"}
      hasFeedBack
    />
  );
});
export default ArticleRating;
