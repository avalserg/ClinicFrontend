import { memo } from "react";
import { classNames } from "@/Shared/lib/classNames/classNames";
import cls from "./Overlay.module.scss";

interface OverlayProps {
  className?: string;
  onClick?: () => void;
}
// background modal window

export const Overlay = memo((props: OverlayProps) => {
  const { className, onClick } = props;

  return (
    <div
      onClick={onClick}
      className={classNames(cls.Overlay, {}, [className])}
     />
  );
});
