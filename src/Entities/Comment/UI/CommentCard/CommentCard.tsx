/* eslint-disable multiline-ternary */
/* eslint-disable react/display-name */
import React, { memo } from "react";
import cls from "./CommentCard.module.scss";
import { classNames } from "@/Shared/lib/classNames/classNames";
import { Comment } from "../../Model/types/comment";
import { Skeleton as SkeletonRedesigned } from "@/Shared/UI/Skeleton";
import { getRouteProfile } from "@/Shared/const/router";
import { HStack, VStack } from "@/Shared/UI/Stack";
import { AppLink } from "@/Shared/UI/AppLink";
import { Text } from "@/Shared/UI/Text";
import { Avatar } from "@/Shared/UI/Avatar";
import { Card } from "@/Shared/UI/Card";

interface CommentCardProps {
  className?: string;
  comment?: Comment;
  isLoading?: boolean;
}

export const CommentCard = memo((props: CommentCardProps) => {
  const { className, comment, isLoading } = props;
  const Skeleton = SkeletonRedesigned;
  if (isLoading) {
    return (
      <VStack
          data-testid={"CommentCard.Loading"}
          gap={"8"}
          max
          className={classNames(cls.CommentCard, {}, [className, cls.loading])}
        >
          <div className={cls.header}>
            <Skeleton width={30} height={30} border="50%" />
            <Skeleton width={100} height={16} className={cls.username} />
          </div>
          <Skeleton width={"100%"} height={50} className={cls.text} />
        </VStack>
    );
  }
  if (!comment) {
    return null;
  }
  return (
    <Card padding={"24"} border={"partialRound"} max>
      <VStack
        data-testid={"CommentCard.Content"}
        gap={"8"}
        max
        className={classNames(cls.CommentCardRedesigned, {}, [className])}
      >
        <AppLink to={getRouteProfile(comment.user.applicationUserId)}>
          <HStack gap={"8"}>
            {comment?.user.avatar ? (
              <Avatar size={30} src={comment.user.avatar} />
            ) : null}
            <Text text={comment?.user.login} bold />
          </HStack>
        </AppLink>
        <Text text={comment?.text} />
      </VStack>
    </Card>
  );
});
