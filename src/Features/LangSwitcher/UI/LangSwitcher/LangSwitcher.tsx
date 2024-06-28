/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { useTranslation } from "react-i18next";
import React, { memo } from "react";
import { Button } from "@/Shared/UI/Button";

interface LangSwitcherProps {
  className?: string;
  short?: boolean;
}

export const LangSwitcher = memo(({ className, short }: LangSwitcherProps) => {
  const { t, i18n } = useTranslation();

  return (
    <Button
      variant="clear"
      onClick={() => {
        i18n.changeLanguage(i18n.language === "ru" ? "en" : "ru");
      }}
    >
      {t(short ? "Короткий язык" : "Русский")}
    </Button>
  );
});
