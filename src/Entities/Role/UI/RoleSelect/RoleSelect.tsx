import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Listbox } from "@/Shared/UI/Popups";
import { Role } from "../../Model/types/role";

interface CurrencySelectProps {
  className?: string;
  value?: Role;
  onChange?: (value: Role) => void;
  readonly?: boolean;
}
const options = [
  { value: Role.USER, content: Role.USER },
  { value: Role.DOCTOR, content: Role.DOCTOR },
  { value: Role.ADMIN, content: Role.ADMIN },
];
// eslint-disable-next-line react/display-name
export const RoleSelect = memo((props: CurrencySelectProps) => {
  const { className, value, onChange, readonly } = props;
  const { t } = useTranslation();
  // map Currency to str
  const onChangeHandler = useCallback(
    (value: string) => {
      onChange?.(value as Role);
    },
    [onChange],
  );
  const propsSelect = {
    className,
    readonly,
    value,
    defaultValue: t("Выберите роль"),
    items: options,
    onChange: onChangeHandler,
    direction: "top right" as const,
    label: t("Укажите роль"),
  };
  return <Listbox {...propsSelect} />;
});
