/* eslint-disable react/display-name */
import { memo } from "react";
import { ArticlesFilters } from "@/Widgets/ArticlesFilters";
import { useArticleFilters } from "../../lib/hooks/useArticleFilters";

interface FiltersContainerProps {
  className?: string;
}

export const FiltersContainer = memo((props: FiltersContainerProps) => {
  const { className } = props;
  const {
    onChangeOrder,
    onChangeSearch,
    onChangeSort,
    onChangeType,
    order,
    search,
    sort,
    type,
  } = useArticleFilters();
  return (
    <ArticlesFilters
      search={search}
      sort={sort}
      type={type}
      order={order}
      onChangeSort={onChangeSort}
      onChangeOrder={onChangeOrder}
      onChangeType={onChangeType}
      onChangeSearch={onChangeSearch}
      className={className}
    />
  );
});
