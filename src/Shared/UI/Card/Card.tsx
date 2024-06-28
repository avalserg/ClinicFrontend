/* eslint-disable react/display-name */
import { HTMLAttributes, ReactNode, memo } from "react";
import cls from "./Card.module.scss";
import { classNames } from "@/Shared/lib/classNames/classNames";

export type CardVariant = "normal" | "outlined" | "light";
export type CardPadding = "0" | "8" | "16" | "24";
export type CardBorder = "roundBorder" | "normalBorder" | "partialRound";
interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
  variant?: CardVariant;
  max?: boolean;
  padding?: CardPadding;
  border?: CardBorder;
  fullHeight?: boolean;
}
const mapPaddingToClass: Record<CardPadding, string> = {
  "0": "gap_0",
  "8": "gap_8",
  "16": "gap_16",
  "24": "gap_24",
};
export const Card = memo((props: CardProps) => {
  const {
    className,
    children,
    variant = "normal",
    max,
    padding = "8",
    border = "normalBorder",
    fullHeight,
    ...otherProps
  } = props;
  const paddingClass = mapPaddingToClass[padding];
  return (
    <div
      className={classNames(
        cls.Card,
        { [cls.max]: max, [cls.fullHeight]: fullHeight },
        [className, cls[variant], cls[paddingClass], cls[border]],
      )}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...otherProps}
    >
      {children}
    </div>
  );
});
