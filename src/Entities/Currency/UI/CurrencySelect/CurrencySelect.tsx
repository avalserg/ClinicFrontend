import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Listbox } from "@/Shared/UI/Popups";
import { Currency } from "../../Model/types/currency";

interface CurrencySelectProps {
  className?: string;
  value?: Currency;
  onChange?: (value: Currency) => void;
  readonly?: boolean;
}
const options = [
  { value: Currency.RUB, content: Currency.RUB },
  { value: Currency.EUR, content: Currency.EUR },
  { value: Currency.USD, content: Currency.USD },
];
// eslint-disable-next-line react/display-name
export const CurrencySelect = memo((props: CurrencySelectProps) => {
  const { className, value, onChange, readonly } = props;
  const { t } = useTranslation();
  // map Currency to str
  const onChangeHandler = useCallback(
    (value: string) => {
      onChange?.(value as Currency);
    },
    [onChange],
  );
  const propsSelect = {
    className,
    readonly,
    value,
    defaultValue: t("Укажите валюту"),
    items: options,
    onChange: onChangeHandler,
    direction: "top right" as const,
    label: t("Укажите валюту"),
  };
  return <Listbox {...propsSelect} />;
});
