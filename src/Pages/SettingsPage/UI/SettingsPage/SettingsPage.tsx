/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useTranslation } from "react-i18next";
import { memo } from "react";
import { Text } from "@/Shared/UI/Text";
import { Page } from "@/Widgets/Page";
import { VStack } from "@/Shared/UI/Stack";
import { UiDesignSwitcher } from "@/Features/uiDesignSwitcher";
import { SettingsPageAccountWidget } from "@/Widgets/SettingsPage";

interface SettingsPageProps {
  className?: string;
}

const SettingsPage = memo((props: SettingsPageProps) => {
  const { className } = props;
  const { t } = useTranslation();

  return (
    <Page>
      <VStack gap={"16"}>
        <Text title={t("Настройки пользователя")} />
        <SettingsPageAccountWidget/>
      </VStack>
    </Page>
  );
});

export default SettingsPage;
