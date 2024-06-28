/* eslint-disable react/display-name */
import React, { memo } from "react";
import cls from "./ArticleCodeBlockComponent.module.scss";

import { classNames } from "@/Shared/lib/classNames/classNames";
import { ArticleCodeBlock } from "../../Model/types/article";
import { Code } from "@/Shared/UI/Code";

interface ArticleCodeBlockComponentProps {
  className?: string;
  block: ArticleCodeBlock;
}

export const ArticleCodeBlockComponent = memo(
  (props: ArticleCodeBlockComponentProps) => {
    const { className, block } = props;

    return (
      <div
        className={classNames(cls.ArticleCodeBlockComponent, {}, [className])}
      >
        <Code text={block.code} />
      </div>
    );
  },
);
