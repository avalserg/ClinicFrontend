/* eslint-disable react/jsx-key */
/* eslint-disable react/display-name */
import React, { memo } from "react";
import cls from "./ArticleTextBlockComponent.module.scss";

import { classNames } from "@/Shared/lib/classNames/classNames";
import { ArticleTextBlock } from "../../Model/types/article";
import { Text } from "@/Shared/UI/Text";

interface ArticleTextBlockComponentProps {
  className?: string;
  block: ArticleTextBlock;
}

export const ArticleTextBlockComponent = memo(
  (props: ArticleTextBlockComponentProps) => {
    const { className, block } = props;

    return (
      <div
        className={classNames(cls.ArticleTextBlockComponent, {}, [className])}
      >
        {block.title && <Text title={block.title} className={cls.title} />}
        {block.paragraphs.map((paragraph) => (
          <Text key={paragraph} text={paragraph} className={cls.paragraph} />
        ))}
      </div>
    );
  },
);
