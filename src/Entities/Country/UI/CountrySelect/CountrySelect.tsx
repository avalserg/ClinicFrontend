import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Country } from "../../Model/types/country";
import { Listbox } from "@/Shared/UI/Popups";

interface CountrySelectProps {
  className?: string;
  value?: Country;
  onChange?: (value: Country) => void;
  readonly?: boolean;
}
const options = [
  { value: Country.Armenia, content: Country.Armenia },
  { value: Country.Belarus, content: Country.Belarus },
  { value: Country.Russia, content: Country.Russia },
  { value: Country.Kazakhstan, content: Country.Kazakhstan },
  { value: Country.Ukraine, content: Country.Ukraine },
];
// eslint-disable-next-line react/display-name
export const CountrySelect = memo((props: CountrySelectProps) => {
  const { className, value, onChange, readonly } = props;
  const { t } = useTranslation();
  // map Currency to str
  const onChangeHandler = useCallback(
    (value: string) => {
      onChange?.(value as Country);
    },
    [onChange],
  );
  const propsSelect = {
    className,
    readonly,
    value,
    defaultValue: t("Укажите страну"),
    items: options,
    onChange: onChangeHandler,
    direction: "top right" as const,
    label: t("Укажите страну"),
  };
  return <Listbox {...propsSelect} />;
});
