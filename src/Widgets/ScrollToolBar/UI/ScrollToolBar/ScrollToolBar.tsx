/* eslint-disable react/display-name */
import { memo } from "react";
import { ScrollToTopButton } from "@/Features/scrollToTopButton";
import { VStack } from "@/Shared/UI/Stack";
import { classNames } from "@/Shared/lib/classNames/classNames";
import cls from "./ScrollToolBar.module.scss";

interface ScrollToolBarProps {
  className?: string;
}

export const ScrollToolBar = memo((props: ScrollToolBarProps) => {
  const { className } = props;

  return (
    <VStack
      justify="center"
      align="center"
      className={classNames(cls.ScrollToolBar, {}, [className])}
    >
      <ScrollToTopButton />
    </VStack>
  );
});
