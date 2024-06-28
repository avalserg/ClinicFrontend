/* eslint-disable react/display-name */
import React, { memo } from "react";
import cls from "./ArticleImageBlockComponent.module.scss";

import { classNames } from "@/Shared/lib/classNames/classNames";
import { ArticleImageBlock } from "../../Model/types/article";
import { Text } from "@/Shared/UI/Text";

interface ArticleImageBlockComponentProps {
  className?: string;
  block: ArticleImageBlock;
}

export const ArticleImageBlockComponent = memo(
  (props: ArticleImageBlockComponentProps) => {
    const { className, block } = props;

    return (
      <div
        className={classNames(cls.ArticleImageBlockComponent, {}, [className])}
      >
        <img src={block.src} alt={block.title} className={cls.img} />
        {block.title && <Text text={block.title} align={"center"} />}
      </div>
    );
  },
);
