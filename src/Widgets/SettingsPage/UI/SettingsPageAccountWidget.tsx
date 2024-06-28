/* eslint-disable react/display-name */
import { memo } from "react";
import cls from "./SettingsPageAccountWidget.module.scss";
import { useTranslation } from "react-i18next";
import { classNames } from "@/Shared/lib/classNames/classNames";
import { HStack, VStack } from "@/Shared/UI/Stack";
import { Text } from "@/Shared/UI/Text";
import { Input } from "@/Shared/UI/Input";

interface SettingsPageAccountWidgetProps {
  className?: string;
}

export const SettingsPageAccountWidget = memo((props: SettingsPageAccountWidgetProps) => {
  const {
    className,
  } = props;
  const { t } = useTranslation("")

  return (
      <VStack>
          <Text title="Страница профиля" />
          <HStack  gap="32">
              <Text text="Фамилия"/>
              <Text text="Авдеенко"/>
          </HStack>
          <HStack  gap="32">
              <Text text="Имя"/>
              <Text text="Авдеенко"/>
          </HStack>
          <HStack  gap="32">
              <Text text="Отчество"/>
              <Text text="Авдеенко"/>
          </HStack>
          <HStack  gap="32">
              <Text text="Дата рождения"/>
              <Text text="Авдеенко"/>
          </HStack>
          <HStack  gap="32">
              <Text text="Адрес"/>
              <Text text="Авдеенко"/>
          </HStack>
          <HStack  gap="32">
              <Text text="Телефон"/>
              <Text text="Авдеенко"/>
          </HStack>
          <HStack  gap="32">
              <Text text="Логин"/>
              <Text text="Авдеенко"/>
          </HStack>
    </VStack>
  );
});
