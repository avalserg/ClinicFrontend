/* eslint-disable react/display-name */
import { useJsonSettings } from "@/Entities/ApplicationUser";
import ThemeProvider from "./ThemeProvider";

export const withTeme = (Component: React.ComponentType) => {
  return () => {
    const { theme: defaultTheme } = useJsonSettings();
    return (
      <ThemeProvider initialTheme={defaultTheme}>
        <Component />
      </ThemeProvider>
    );
  };
};
