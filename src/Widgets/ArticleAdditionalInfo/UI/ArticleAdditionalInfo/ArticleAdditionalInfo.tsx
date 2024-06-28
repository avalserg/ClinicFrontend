/* eslint-disable react/display-name */
import { memo } from "react";
import { useTranslation } from "react-i18next";
import cls from "./ArticleAdditionalInfo.module.scss";
import { classNames } from "@/Shared/lib/classNames/classNames";
import { ApplicationUser } from "@/Entities/ApplicationUser";
import { HStack, VStack } from "@/Shared/UI/Stack";
import { Avatar } from "@/Shared/UI/Avatar";
import { Text } from "@/Shared/UI/Text";
import { Button } from "@/Shared/UI/Button";

interface ArticleAdditionalInfoProps {
  className?: string;
  author: ApplicationUser;
  createdAt: string;
  views: number;
  onEdit: () => void;
}

export const ArticleAdditionalInfo = memo(
  (props: ArticleAdditionalInfoProps) => {
    const { className, author, createdAt, views, onEdit } = props;
    const { t } = useTranslation("");

    return (
      <VStack
        gap={"32"}
        className={classNames(cls.ArticleAdditionalInfo, {}, [className])}
      >
        <HStack gap={"8"}>
          <Avatar src={author.avatar} size={32} />
          <Text text={author.login} bold />
          <Text text={createdAt} bold />
        </HStack>
        <Button onClick={onEdit}>{t("Редактировать")}</Button>
        <Text text={t("{{count}} просмотров", { count: views })} />
      </VStack>
    );
  },
);
