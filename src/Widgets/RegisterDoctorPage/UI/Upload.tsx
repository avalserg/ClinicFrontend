/* eslint-disable react/display-name */
import { memo, useId } from "react";
import cls from "./Upload.module.scss";
import { useTranslation } from "react-i18next";
import { classNames } from "@/Shared/lib/classNames/classNames";

interface UploadProps {
  className?: string;
}

export const Upload = memo((props: UploadProps) => {
  const {
    className,
  } = props;
  const { t } = useTranslation("")
    const id = useId();
  return (
     <label htmlFor={id}>
        <input type="file" id={id}/>
    </label>
  );
});
