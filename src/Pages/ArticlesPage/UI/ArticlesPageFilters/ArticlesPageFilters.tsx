/* eslint-disable react/display-name */
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { ArticleSortSelector } from "@/Features/ArticleSortSelector";
import { ArticleTypeTabs } from "@/Features/ArticleTypeTabs";
import { ArticleViewSelector } from "@/Features/ArticleViewSelector";
import { Input } from "@/Shared/UI/Input";
import { Card } from "@/Shared/UI/Card";
import { classNames } from "@/Shared/lib/classNames/classNames";
import cls from "./ArticlesPageFilters.module.scss";
import { useArticleFilters } from "../../lib/hooks/useArticleFilters";

interface ArticlesPageFiltersProps {
  className?: string;
}

export const ArticlesPageFilters = memo((props: ArticlesPageFiltersProps) => {
  const { className } = props;
  const { t } = useTranslation("");
  const {
    onChangeOrder,
    onChangeSearch,
    onChangeSort,
    onChangeType,
    onChangeView,
    order,
    search,
    sort,
    type,
    view,
  } = useArticleFilters();

  return (
    <div className={classNames(cls.ArticlesPageFilters, {}, [className])}>
      <div className={cls.sortWrapper}>
        <ArticleSortSelector
          order={order}
          sort={sort}
          onchangeSort={onChangeSort}
          onchangeOrder={onChangeOrder}
        />
        <ArticleViewSelector view={view} onViewClick={onChangeView} />
      </div>
      <Card className={cls.search}>
        <Input
          onChange={onChangeSearch}
          value={search}
          placeholder={t("Поиск")}
        />
      </Card>
      <ArticleTypeTabs
        onChangeType={onChangeType}
        value={type}
        className={cls.tabs}
       />
    </div>
  );
});
