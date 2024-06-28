/* eslint-disable react/display-name */
import { HTMLAttributeAnchorTarget, memo } from "react";
import { ArticleView } from "../../Model/consts/articleConsts";
import { Article } from "../../Model/types/article";
import { ArticleListItemRedesigned } from "./ArticleListItemRedesigned/ArticleListItemRedesigned";

export interface ArticleListItemProps {
  className?: string;
  article: Article;
  view: ArticleView;
  target?: HTMLAttributeAnchorTarget;
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
  return <ArticleListItemRedesigned {...props} />;
});
