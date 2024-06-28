/* eslint-disable react/display-name */
// Generic
import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import cls from "./ArticleSortSelector.module.scss";
import { classNames } from "@/Shared/lib/classNames/classNames";
import { SelectOption } from "@/Shared/UIDeprecated/deprecated/Select";
import { SortOrder } from "@/Shared/Types/sort";
import { ArticleSortField } from "@/Entities/Article";
import { Listbox } from "@/Shared/UI/Popups";
import { VStack } from "@/Shared/UI/Stack";
import { Text } from "@/Shared/UI/Text";

interface ArticleSortSelectorProps {
  className?: string;
  sort: ArticleSortField;
  order: SortOrder;
  onchangeOrder: (newOrder: SortOrder) => void;
  onchangeSort: (newSort: ArticleSortField) => void;
}

export const ArticleSortSelector = memo((props: ArticleSortSelectorProps) => {
  const { className, onchangeOrder, onchangeSort, order, sort } = props;
  const { t } = useTranslation("");
  const orderOptions = useMemo<Array<SelectOption<SortOrder>>>(
    () => [
      {
        value: "asc",
        content: t("возрастанию"),
      },
      {
        value: "desc",
        content: t("убыванию"),
      },
    ],
    [t],
  );
  const sortFieldOptions = useMemo<Array<SelectOption<ArticleSortField>>>(
    () => [
      {
        value: ArticleSortField.CREATED,
        content: t("дате создания"),
      },
      {
        value: ArticleSortField.TITLE,
        content: t("названию"),
      },
      {
        value: ArticleSortField.VIEWS,
        content: t("просмотрам"),
      },
    ],
    [t],
  );

  return (
    <div
      className={classNames(cls.ArticleSortSelectorRedesigned, {}, [className])}
    >
      <VStack gap={"8"}>
        <Text text={t("Сортировать по:")} />
        <Listbox
          items={sortFieldOptions}
          value={sort}
          onChange={onchangeSort}
        />
        <Listbox items={orderOptions} value={order} onChange={onchangeOrder} />
      </VStack>
    </div>
  );
});
