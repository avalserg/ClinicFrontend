/* eslint-disable react/display-name */
import React, { memo } from "react";
import cls from "./AppLogo.module.scss";

import AppSvg from "@/Shared/Assets/Icons/app-image-new.svg";
import { classNames } from "@/Shared/lib/classNames/classNames";
import { HStack } from "../Stack";

interface AppLogoProps {
  className?: string;
  size?: number;
}

export const AppLogo = memo(({ className, size = 50 }: AppLogoProps) => {
  return (
    <HStack
      max
      justify="center"
      className={classNames(cls.appLogoWrapper, {}, [className])}
    >
      <AppSvg
        width={size}
        height={size}
        color="black"
        className={cls.appLogo}
      />
      <div className={cls.gradientBig} />
      <div className={cls.gradientSmall} />
    </HStack>
  );
});
