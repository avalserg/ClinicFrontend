/* eslint-disable react/display-name */
import { memo } from "react";
import { useTranslation } from "react-i18next";
import EyeIcon from "@/Shared/Assets/Icons/eye.svg";
import { AppImage } from "@/Shared/UI/AppImage";
import { AppLink } from "@/Shared/UI/AppLink";
import { Avatar } from "@/Shared/UI/Avatar";
import { Button } from "@/Shared/UI/Button";
import { Card } from "@/Shared/UI/Card";
import { Icon } from "@/Shared/UI/Icon";
import { Skeleton } from "@/Shared/UI/Skeleton";
import { HStack, VStack } from "@/Shared/UI/Stack";
import { Text } from "@/Shared/UI/Text";
import { getRouteArticleDetails } from "@/Shared/const/router";
import { classNames } from "@/Shared/lib/classNames/classNames";
import {
  ArticleBlockType,
  ArticleView,
} from "../../../Model/consts/articleConsts";
import { ArticleTextBlock } from "../../../Model/types/article";
import { ArticleListItemProps } from "../ArticleListItem";
import cls from "./ArticleListItemRedesigned.module.scss";

export const ArticleListItemRedesigned = memo((props: ArticleListItemProps) => {
  const { className, article, view, target } = props;
  const { t } = useTranslation("");

  const userInfo = (
    <>
      <Avatar size={32} src={article.user.avatar} className={cls.avatar} />
      <Text bold text={article.user.login} />
    </>
  );
  const views = (
    // article.views has Nymber type
    <HStack gap={"8"}>
      <Icon Svg={EyeIcon} />
      <Text text={String(article.views)} className={cls.views} />
    </HStack>
  );
  if (view === ArticleView.BIG) {
    // 1 попавшийся блок
    const textBlock = article.blocks.find(
      (block) => block.type === ArticleBlockType.TEXT,
    ) as ArticleTextBlock;
    return (
      <Card
        padding={"24"}
        max
        data-testid={"ArticleListItem"}
        className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
      >
        <VStack max gap={"16"}>
          <HStack gap={"8"} max>
            {userInfo}
            <Text text={article.createdAt} />
          </HStack>
          <Text bold title={article.title} />
          <Text title={article.subtitle} size={"s"} />
          <AppImage
            fallback={<Skeleton width={"100%"} height={250} />}
            src={article.img}
            className={cls.img}
            alt={article.title}
          />
          {textBlock?.paragraphs && (
            <Text
              text={textBlock.paragraphs.slice(0, 2).join(" ")}
              className={cls.textBlock}
            />
          )}
          <HStack max justify={"between"}>
            <AppLink to={getRouteArticleDetails(article.id)} target={target}>
              <Button variant={"outline"}>{t("Читать далее ...")}</Button>
            </AppLink>
            {views}
          </HStack>
        </VStack>
      </Card>
    );
  }
  return (
    <AppLink
      data-testid="ArticleListItem"
      target={target}
      to={getRouteArticleDetails(article.id)}
      className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
    >
      <Card className={cls.card} border={"partialRound"} padding={"0"}>
        <AppImage
          fallback={<Skeleton width={"100%"} height={200} />}
          alt={article.title}
          src={article.img}
          className={cls.img}
        />
        <VStack className={cls.info} gap="4">
          <Text title={article.title} className={cls.title} />
          <VStack gap="4" className={cls.footer} max>
            <HStack justify="between" max>
              <Text text={article.createdAt} className={cls.date} />
              {views}
            </HStack>
            <HStack gap="4">{userInfo}</HStack>
          </VStack>
        </VStack>
      </Card>
    </AppLink>
  );
});
