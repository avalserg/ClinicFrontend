/* eslint-disable react/display-name */
import { memo, useCallback, useMemo } from "react";

import { useTranslation } from "react-i18next";
import { classNames } from "@/Shared/lib/classNames/classNames";
import { TabItem } from "@/Shared/UI/Tabs/Tabs";
import { ArticleType } from "@/Entities/Article";
import { Tabs } from "@/Shared/UI/Tabs";

interface ArticleTypeTabsProps {
  className?: string;
  value: ArticleType;
  onChangeType: (type: ArticleType) => void;
}

export const ArticleTypeTabs = memo((props: ArticleTypeTabsProps) => {
  const { className, value, onChangeType } = props;
  const { t } = useTranslation("");
  const typeTabs = useMemo<TabItem[]>(
    () => [
      {
        value: ArticleType.ALL,
        content: t("Все статьи"),
      },
      {
        value: ArticleType.IT,
        content: t("Айти"),
      },
      {
        value: ArticleType.ECONOMICS,
        content: t("Экономика"),
      },
      {
        value: ArticleType.SCIENCE,
        content: t("Наука"),
      },
    ],
    [t],
  );
  const onTabClick = useCallback(
    (tab: TabItem) => {
      onChangeType(tab.value as ArticleType);
    },
    [onChangeType],
  );
  return (
    <Tabs
      direction={"column"}
      tabs={typeTabs}
      value={value}
      onTabClick={onTabClick}
      className={classNames("", {}, [className])}
     />
  );
});
