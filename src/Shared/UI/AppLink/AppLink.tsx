/* eslint-disable react/jsx-props-no-spreading */
import { NavLink, type LinkProps } from "react-router-dom";
import React, { memo, type FC } from "react";
import { classNames } from "@/Shared/lib/classNames/classNames";
import cls from "./AppLink.module.scss";

export type AppLinkVariant = "primary" | "red";
interface AppLinkProps extends LinkProps {
  className?: string;
  children?: React.ReactNode;
  // link theme
  variant?: AppLinkVariant;
  activeClassName?: string;
}

// eslint-disable-next-line react/display-name
export const AppLink: FC<AppLinkProps> = memo((props: AppLinkProps) => {
  const {
    to,
    className,
    children,
    variant = "primary",
    activeClassName = "",
    ...otherProps
  } = props;

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        classNames(cls.AppLink, { [activeClassName]: isActive }, [
          className,
          cls[variant],
        ])
      }
      {...otherProps}
    >
      {children}
    </NavLink>
  );
});
