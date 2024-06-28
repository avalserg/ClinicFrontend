/* eslint-disable react/display-name */
import { Suspense, memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { CommentList } from "@/Entities/Comment";
import { AddCommentForm } from "@/Features/addCommentForm";
import { getArticleCommentsIsLoading } from "../../Model/selectors/comments";
import { addCommentForArticle } from "../../Model/services/addCommentForArticle/addCommentForArticle";
import { getArticleComments } from "../../Model/slices/articleDetailsCommentsSlice";
import { classNames } from "@/Shared/lib/classNames/classNames";
import { Text } from "@/Shared/UI/Text";
import { useAppDispatch } from "@/Shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useInitialEffect } from "@/Shared/lib/hooks/useInitialEffect/useInitialEffect";
import { fetchCommentByArticleId } from "../../Model/services/fetchCommentByArticleId/fetchCommentByArticleId";
import { VStack } from "@/Shared/UI/Stack";
import { Loader } from "@/Shared/UI/Loader";

interface ArticleDetailsCommentsProps {
  className?: string;
  id?: string;
}

export const ArticleDetailsComments = memo(
  (props: ArticleDetailsCommentsProps) => {
    const { className, id } = props;
    const { t } = useTranslation("");
    const comments = useSelector(getArticleComments.selectAll);
    const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
    const dispatch = useAppDispatch();

    const onSendComment = useCallback(
      (text: string) => {
        void dispatch(addCommentForArticle(text));
      },
      [dispatch],
    );

    useInitialEffect(() => {
      void dispatch(fetchCommentByArticleId(id));
    });
    return (
      <VStack gap={"16"} max className={classNames("", {}, [className])}>
        <Text size={"l"} title={t("Комментарии")} />

        <Suspense fallback={<Loader />}>
          <AddCommentForm onSendComment={onSendComment} />
        </Suspense>
        <CommentList isLoading={commentsIsLoading} comments={comments} />
      </VStack>
    );
  },
);
