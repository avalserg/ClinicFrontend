import { useTranslation } from "react-i18next";
import React from "react";
import { Page } from "@/Widgets/Page";

const ForbiddenPage = () => {
  const { t } = useTranslation("about");
  return (
    <Page data-testid={"ForbiddenPage"}>
      {t("У вас нет доступа к этой странице")}
    </Page>
  );
};

export default ForbiddenPage;
