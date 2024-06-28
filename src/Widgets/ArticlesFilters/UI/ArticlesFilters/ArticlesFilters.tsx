/* eslint-disable react/display-name */
import { memo } from "react";
import { useTranslation } from "react-i18next";
import cls from "./ArticlesFilters.module.scss";
import { classNames } from "@/Shared/lib/classNames/classNames";
import { Card } from "@/Shared/UI/Card";
import { ArticleSortSelector } from "@/Features/ArticleSortSelector";
import { ArticleTypeTabs } from "@/Features/ArticleTypeTabs";
import { VStack } from "@/Shared/UI/Stack";
import { ArticleSortField, ArticleType } from "@/Entities/Article";
import { SortOrder } from "@/Shared/Types/sort";
import { Input } from "@/Shared/UI/Input";
import SearchIcon from "@/Shared/Assets/Icons/search.svg";
import { Icon } from "@/Shared/UI/Icon";

interface ArticlesFiltersProps {
  className?: string;
  sort: ArticleSortField;
  order: SortOrder;
  type: ArticleType;
  search: string;
  onChangeSearch: (value: string) => void;
  onChangeOrder: (newOrder: SortOrder) => void;
  onChangeSort: (newSort: ArticleSortField) => void;
  onChangeType: (type: ArticleType) => void;
}

export const ArticlesFilters = memo((props: ArticlesFiltersProps) => {
  const {
    className,
    onChangeType,
    onChangeOrder,
    onChangeSort,
    onChangeSearch,
    order,
    search,
    sort,
    type,
  } = props;
  const { t } = useTranslation("");

  return (
    <Card
      className={classNames(cls.ArticlesFilters, {}, [className])}
      padding={"24"}
    >
      <VStack gap={"32"}>
        <Input
          onChange={onChangeSearch}
          value={search}
          size={"s"}
          placeholder={t("Поиск")}
          addonLeft={<Icon Svg={SearchIcon} />}
        />
        <ArticleTypeTabs
          onChangeType={onChangeType}
          value={type}
          className={cls.tabs}
         />
        <ArticleSortSelector
          order={order}
          sort={sort}
          onchangeSort={onChangeSort}
          onchangeOrder={onChangeOrder}
        />
      </VStack>
    </Card>
  );
});
