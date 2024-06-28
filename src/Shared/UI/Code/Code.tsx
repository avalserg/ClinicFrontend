/* eslint-disable react/display-name */
import React, { memo, useCallback } from "react";
import cls from "./Code.module.scss";
import { classNames } from "@/Shared/lib/classNames/classNames";

import CopyIconNew from "@/Shared/Assets/Icons/copy.svg";
import { Icon } from "../Icon";

interface CodeProps {
  className?: string;
  text: string;
}

export const Code = memo((props: CodeProps) => {
  const { className, text } = props;

  const onCopy = useCallback(() => {
    // eslint-disable-next-line no-void
    void navigator.clipboard.writeText(text);
  }, [text]);

  return (
    <pre className={classNames(cls.CodeRedesigned, {}, [className])}>
      <Icon
        clickable
        onClick={onCopy}
        className={cls.copyBtn}
        Svg={CopyIconNew}
      />
      <code>{text}</code>
    </pre>
  );
});
