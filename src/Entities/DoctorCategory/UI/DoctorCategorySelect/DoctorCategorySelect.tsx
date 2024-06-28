import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Listbox } from "@/Shared/UI/Popups";
import { DoctorCategory } from "../../Model/types/doctorCategory";

interface DoctorCategorySelectProps {
  className?: string;
  value?: DoctorCategory;
  onChange?: (value: DoctorCategory) => void;
  readonly?: boolean;
}
const options = [
  { value: DoctorCategory.Вторая, content: DoctorCategory.Вторая },
  { value: DoctorCategory.Первая, content: DoctorCategory.Первая },
  { value: DoctorCategory.Высшая, content: DoctorCategory.Высшая },
];
// eslint-disable-next-line react/display-name
export const DoctorCategorySelect = memo((props: DoctorCategorySelectProps) => {
  const { className, value, onChange, readonly } = props;
  const { t } = useTranslation();
  // map Currency to str
  const onChangeHandler = useCallback(
    (value: string) => {
      onChange?.(value as DoctorCategory);
    },
    [onChange],
  );
  const propsSelect = {
    className,
    readonly,
    value,
    defaultValue: t("Выберите категорию"),
    items: options,
    onChange: onChangeHandler,
    direction: "top right" as const,
    label: t("Категория"),
  };
  return <Listbox {...propsSelect} />;
});
