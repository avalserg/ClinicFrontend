/* eslint-disable react/jsx-key */
/* eslint-disable multiline-ternary */
/* eslint-disable react/display-name */
import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "@/Shared/lib/classNames/classNames";
import { Text } from "@/Shared/UI/Text";
import { CommentCard } from "../CommentCard/CommentCard";
import { Comment } from "../../Model/types/comment";
import { VStack } from "@/Shared/UI/Stack";

interface CommentListProps {
  className?: string;
  // comments take outside for reusable behaviour
  comments?: Comment[];
  isLoading?: boolean;
}

export const CommentList = memo((props: CommentListProps) => {
  const { className, comments, isLoading } = props;
  const { t } = useTranslation();
  if (isLoading) {
    return (
      <VStack gap={"16"} max className={classNames("", {}, [className])}>
        <CommentCard isLoading />
        <CommentCard isLoading />
        <CommentCard isLoading />
      </VStack>
    );
  }

  return (
    <VStack gap={"16"} max className={classNames("", {}, [className])}>
      {comments?.length ? (
        comments.map((comment) => (
          <CommentCard
            isLoading={isLoading}
            comment={comment}
            key={comment.id}
          />
        ))
      ) : (
        <Text text={t("Комментарии отсутствуют")} />
      )}
    </VStack>
  );
});
