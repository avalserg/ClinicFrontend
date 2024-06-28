/* eslint-disable react/jsx-key */
/* eslint-disable react/display-name */
// can place feature level instead entities
import { memo } from "react";
import cls from "./ArticleViewSelector.module.scss";
import { classNames } from "@/Shared/lib/classNames/classNames";
import ListIcon from "@/Shared/Assets/Icons/burger.svg";
import TiledIcon from "@/Shared/Assets/Icons/tile.svg";

import { ArticleView } from "@/Entities/Article";
import { Icon } from "@/Shared/UI/Icon";
import { Card } from "@/Shared/UI/Card";
import { VStack } from "@/Shared/UI/Stack";

interface ArticleViewSelectorProps {
  className?: string;
  view: ArticleView;
  onViewClick?: (view: ArticleView) => void;
}
const viewTypes = [
  {
    view: ArticleView.SMALL,
    icon: TiledIcon,
  },
  {
    view: ArticleView.BIG,
    icon: ListIcon,
  },
];
export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
  const { className, view, onViewClick } = props;
  const onClick = (newView: ArticleView) => () => {
    onViewClick?.(newView);
  };

  return (
    <Card
      className={classNames(cls.ArticleViewSelectorRedesigned, {}, [className])}
      border="roundBorder"
    >
      <VStack gap="8">
        {viewTypes.map((viewType) => (
          <Icon
            clickable
            onClick={onClick(viewType.view)}
            Svg={viewType.icon}
            className={classNames(
              "",
              { [cls.notSelected]: viewType.view !== view },
              [],
            )}
          />
        ))}
      </VStack>
    </Card>
  );
});
