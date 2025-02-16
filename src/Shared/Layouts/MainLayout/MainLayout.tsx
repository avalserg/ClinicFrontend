/* eslint-disable react/display-name */
import { ReactElement, memo } from "react";
import cls from "./MainLayout.module.scss";
import { classNames } from "@/Shared/lib/classNames/classNames";

interface MainLayuotProps {
  className?: string;
  header: ReactElement;
  content: ReactElement;
  sidebar: ReactElement;
  toolbar?: ReactElement;
}

// каркас приложения
export const MainLayout = memo((props: MainLayuotProps) => {
  const { className, content, header, sidebar, toolbar } = props;

  return (
    <div className={classNames(cls.MainLayout, {}, [className])}>
      <div className={cls.content}>{content}</div>
      <div className={cls.sidebar}>{sidebar}</div>
      <div className={cls.rightbar}>
        <div className={cls.header}>{header}</div>
        <div className={cls.toolbar}>{toolbar}</div>
      </div>
    </div>
  );
});
