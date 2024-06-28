/* eslint-disable react/display-name */

/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import React, { ChangeEvent, useMemo } from "react";
import cls from "./Select.module.scss";
import { Mods, classNames } from "@/Shared/lib/classNames/classNames";

export interface SelectOption<T extends string> {
  value: T;
  content: string;
}

interface SelectProps<T extends string> {
  className?: string;
  label?: string;
  options?: Array<SelectOption<T>>;
  value?: T;
  onChange?: (value: T) => void;
  readonly?: boolean;
}
/**
 * Устарел используем новые компоненты из папки redesigned
 * @deprecated
 */
export const Select = <T extends string>(props: SelectProps<T>) => {
  const { className, label, options, value, onChange, readonly } = props;
  const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value as T);
  };
  const optionsList = useMemo(() => {
    return options?.map((opt) => (
      <option className={cls.option} value={opt.value} key={opt.value}>
        {opt.content}
      </option>
    ));
  }, [options]);
  const mods: Mods = {};
  return (
    <div className={classNames(cls.Wrapper, mods, [className])}>
      {label && <span className={cls.label}>{`${label  }>`}</span>}
      <select
        disabled={readonly}
        className={cls.select}
        value={value}
        onChange={onChangeHandler}
      >
        {optionsList}
      </select>
    </div>
  );
};
