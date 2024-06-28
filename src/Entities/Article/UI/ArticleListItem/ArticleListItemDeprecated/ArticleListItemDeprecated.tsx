/* eslint-disable react/display-name */
import { memo } from "react";
import { useTranslation } from "react-i18next";
import cls from "../ArticleListItem.module.scss";
import { classNames } from "@/Shared/lib/classNames/classNames";
import { ArticleListItemProps } from "../ArticleListItem";
import { ArticleTextBlock } from "../../../Model/types/article";
import { AppLink } from "@/Shared/UI/AppLink/AppLink";
import { Avatar } from "@/Shared/UI/Avatar/Avatar";
import { Button} from "@/Shared/UI/Button/Button";
import { Card } from "@/Shared/UI/Card/Card";
import { Icon } from "@/Shared/UI/Icon/Icon";
import { Skeleton } from "@/Shared/UI/Skeleton/Skeleton";
import { AppImage } from "@/Shared/UI/AppImage";
import { getRouteArticleDetails } from "@/Shared/const/router";
import { ArticleTextBlockComponent } from "../../ArticleTextBlockComponent/ArticleTextBlockComponent";
import {
  ArticleBlockType,
  ArticleView,
} from "../../../Model/consts/articleConsts";
import { Text } from "@/Shared/UI/Text/Text";
import EyeIcon from "@/Shared/Assets/Icons/eye-20-20.svg";

export const ArticleListItemDeprecated = memo((props: ArticleListItemProps) => {
  const { className, article, view = ArticleView.SMALL, target } = props;
  const { t } = useTranslation("");

  const types = <Text text={article.type.join(", ")} className={cls.types} />;
  const views = (
    // article.views has Nymber type
    <>
      <Text text={String(article.views)} className={cls.views} />
      <Icon Svg={EyeIcon} />
    </>
  );
  if (view === ArticleView.BIG) {
    // 1 попавшийся блок
    const textBlock = article.blocks.find(
      (block) => block.type === ArticleBlockType.TEXT,
    ) as ArticleTextBlock;
    return (
      <div
        data-testid={"ArticleListItem"}
        className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
      >
        <Card className={cls.card}>
          <div className={cls.header}>
            <Avatar size={30} src={article.user.avatar} />
            <Text text={article.user.login} className={cls.username} />
            <Text text={article.createdAt} className={cls.date} />
          </div>
          <Text title={article.title} className={cls.title} />
          {types}
          <AppImage
            fallback={<Skeleton width={"100%"} height={250} />}
            src={article.img}
            className={cls.img}
            alt={article.title}
          />
          {textBlock && (
            <ArticleTextBlockComponent
              block={textBlock}
              className={cls.textBlock}
            />
          )}
          <div className={cls.footer}>
            <AppLink to={getRouteArticleDetails(article.id)} target={target}>
              <Button variant={"outline"}>
                {t("Читать далее ...")}
              </Button>
            </AppLink>
            {views}
          </div>
        </Card>
      </div>
    );
  }
  return (
    <AppLink
      data-testid={"ArticleListItem"}
      target={target}
      to={getRouteArticleDetails(article.id)}
      className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
    >
      <Card className={cls.card}>
        <div className={cls.imageWrapper}>
          <AppImage
            fallback={<Skeleton width={200} height={200} />}
            src={article.img}
            className={cls.img}
            alt={article.title}
          />
          <Text text={article.createdAt} className={cls.date} />
        </div>
        <div className={cls.infoWrapper}>
          {types}
          {views}
        </div>
        <Text text={article.title} className={cls.title} />
      </Card>
    </AppLink>
  );
});
