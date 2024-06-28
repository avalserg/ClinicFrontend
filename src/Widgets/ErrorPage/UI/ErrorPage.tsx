import { useTranslation } from "react-i18next";
import { classNames } from "@/Shared/lib/classNames/classNames";

import cls from "./ErrorPage.module.scss";
import { Button } from "@/Shared/UI/Button";

interface ErrorPageProps {
  className?: string;
}

export const ErrorPage = ({ className }: ErrorPageProps) => {
  const { t } = useTranslation();

  const reloadPage = () => {
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  };

  return (
    <div className={classNames(cls.ErrorPage, {}, [className])}>
      <p>{t("Произошла непредвиденная ошибка")}</p>
      <Button onClick={reloadPage}>{t("Обновить страницу")}</Button>
    </div>
  );
};
