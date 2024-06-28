В проекте для каждого компонента описываются стори-кейсы.
Запросы на сервер мокаются с помощью storybook-addon-mock.

Файл со сторикейсами создает рядом с компонентом с расширением .stories.tsx

Запустить сторибук можно командой:

- `npm run storybook`

Подробнее о [Storybook](/docs/storybook.md)

Пример:

```typescript jsx
import { Mods, classNames } from "@/Shared/lib/classNames/classNames";
import React, { memo, type ButtonHTMLAttributes, type FC } from "react";
import cls from "./Button.module.scss";
export enum ButtonTheme {
  // кнопка без всего
  CLEAR = "clear",
  CLEAR_INVERTED = "clearInverted",
  BACKGROUND = "background",
  OUTLINE = "outline",
  OUTLINE_RED = "outline_red",
  BACKGROUND_INVERTED = "backgroundInverted",
}
export enum ButtonSize {
  M = "size_m",
  L = "size_l",
  XL = "size_xl",
}
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: React.ReactNode;
  theme?: ButtonTheme;
  square?: boolean;
  size?: ButtonSize;
  disabled?: boolean;
  fullWidth?: boolean;
}

export const Button: FC<ButtonProps> = memo(
  ({
    className,
    children,
    theme = ButtonTheme.OUTLINE,
    square,
    disabled,
    size = ButtonSize.M,
    fullWidth,
    ...otherProps
  }: ButtonProps) => {
    const mods: Mods = {
      [cls[theme]]: true,
      [cls.square]: square,
      [cls[size]]: true,
      [cls.disabled]: disabled,
      [cls.fullWidth]: fullWidth,
    };
    return (
      <button
        className={classNames(cls.Button, mods, [className])}
        disabled={disabled}
        {...otherProps}
      >
        {children}
      </button>
    );
  }
);
```
