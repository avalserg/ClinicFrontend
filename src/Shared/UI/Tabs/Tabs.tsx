/* eslint-disable react/display-name */
import { ReactNode, memo, useCallback } from "react";
import cls from "./Tabs.module.scss";
import { classNames } from "@/Shared/lib/classNames/classNames";
import { Card } from "../Card/Card";
import { Flex, FlexDirection } from "../Stack/Flex/Flex";

export interface TabItem {
  value: string;
  content: ReactNode;
}

interface TabsProps {
  className?: string;
  tabs: TabItem[];
  value: string;
  onTabClick: (tab: TabItem) => void;
  direction?: FlexDirection;
}

export const Tabs = memo((props: TabsProps) => {
  const { className, onTabClick, tabs, value, direction = "row" } = props;
  // closure for Tab ... not event
  const clickHandle = useCallback(
    (tab: TabItem) => {
      return () => {
        onTabClick(tab);
      };
    },
    [onTabClick],
  );
  return (
    <Flex
      align={"start"}
      direction={direction}
      gap={"8"}
      className={classNames(cls.Tabs, {}, [className])}
    >
      {tabs.map((tab) => {
        const isSelected = tab.value === value;
        return (
          <Card
            variant={isSelected ? "light" : "normal"}
            className={classNames(cls.tab, { [cls.selected]: isSelected })}
            key={tab.value}
            onClick={clickHandle(tab)}
            border={"roundBorder"}
          >
            {tab.content}
          </Card>
        );
      })}
    </Flex>
  );
});
