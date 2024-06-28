/* eslint-disable react/display-name */
import { memo, useCallback } from "react";
import { saveJsonSettings } from "@/Entities/ApplicationUser";
import ThemeIcon from "@/Shared/Assets/Icons/theme.svg";
import { Icon } from "@/Shared/UI/Icon";
import { useAppDispatch } from "@/Shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useTheme } from "@/Shared/lib/hooks/useTheme/useTheme";

interface ThemeSwitcherProps {
  className?: string;
}

const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
  const { toggleTheme } = useTheme();
  const dispatch = useAppDispatch();
  const onToggleHandler = useCallback(() => {
    toggleTheme((newTheme) => {
      // async thunk required dispatch
      void dispatch(
        saveJsonSettings({
          theme: newTheme,
        }),
      );
    });
  }, [dispatch, toggleTheme]);
  return <Icon Svg={ThemeIcon} clickable onClick={onToggleHandler} />;
});

export default ThemeSwitcher;
