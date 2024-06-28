import { Fragment, ReactNode, useMemo } from "react";
import { Listbox as HListBox } from "@headlessui/react";
import { useTranslation } from "react-i18next";
import cls from "./ListBox.module.scss";
import { classNames } from "@/Shared/lib/classNames/classNames";
import { Button } from "../../../Button/Button";
import { HStack } from "../../../Stack";
import { DropdownDirection } from "@/Shared/Types/ui";
import { mapDirectionClass } from "../../styles/consts";
import popupCls from "../../styles/popup.module.scss";
import ArrowIcon from "@/Shared/Assets/Icons/arrow-bottom.svg";
import { Icon } from "../../../Icon";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface ListBoxItem<T extends string> {
  value: string;
  content: ReactNode;
  disabled?: boolean;
}
interface ListBoxProps<T extends string> {
  items?: Array<ListBoxItem<T>>;
  className?: string;
  // checked element
  value?: T;
  defaultValue?: string;
  onChange: (value: T) => void;
  readonly?: boolean;
  direction?: DropdownDirection;
  label?: string;
}

export function Listbox<T extends string>(props: ListBoxProps<T>) {
  const { t } = useTranslation();
  const {
    className,
    items,
    value,
    defaultValue,
    onChange,
    readonly,
    direction = "bottom left",
    label,
  } = props;
  const optionClasses = [mapDirectionClass[direction], popupCls.menu];

  const selectedItem = useMemo(() => {
    return items?.find((item) => item.value === value);
  }, [items, value]);
  return (
    <HStack gap={"32"}>
      {label && <span>{`${label  }`}</span>}
      {/* as - which tag wrapped */}
      <HListBox
        disabled={readonly}
        as={"div"}
        className={classNames(cls.ListBox, {}, [className, popupCls.popup])}
        value={value}
        onChange={onChange}
      >
        <HListBox.Button
          as={Button}
          disabled={readonly}
          className={cls.trigger}
        >
          <Button
            variant={"clear"}
            disabled={readonly}
            addonRight={<Icon Svg={ArrowIcon} />}
          >
            {/* {selectedItem?.content ?? defaultValue} */}
            {t((selectedItem?.content ?? defaultValue) as string)}
          </Button>
        </HListBox.Button>
        <HListBox.Options
          className={classNames(cls.options, {}, optionClasses)}
        >
          {items?.map((item) => (
            <HListBox.Option
              key={item.value}
              value={item.value}
              disabled={item.disabled}
              as={Fragment}
            >
              {({ active, selected }) => (
                <li
                  className={classNames(cls.item, {
                    [popupCls.active]: active,
                    [popupCls.disabled]: item.disabled,
                    [popupCls.selected]: selected,
                  })}
                >
                  {selected}
                  {/* {item.content} */}
                  {t(item.content as string)}
                </li>
              )}
            </HListBox.Option>
          ))}
        </HListBox.Options>
      </HListBox>
    </HStack>
  );
}
