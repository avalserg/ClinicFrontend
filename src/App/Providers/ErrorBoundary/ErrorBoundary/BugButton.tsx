import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/Shared/UI/Button";

// Компонент для тестирования ErrorBoundary
export const BugButton = () => {
  const [error, setError] = useState(false);
  const { t } = useTranslation();

  const onThrow = () => {
    setError(true);
  };

  useEffect(() => {
    if (error) {
      throw new Error("BugButton error");
    }
  }, [error]);

  return <Button onClick={onThrow}>{t("throw error")}</Button>;
};
