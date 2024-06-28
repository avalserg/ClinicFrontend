import { memo } from "react";
import { useTranslation } from "react-i18next";
import cls from "./RegisterDoctorPageWidget.module.scss";
import { classNames } from "@/Shared/lib/classNames/classNames";
import { HStack, VStack } from "@/Shared/UI/Stack";
import { AppImage } from "@/Shared/UI/AppImage";
import { RegisterDoctorForm } from "@/Features/RegisterDoctorForm";
import DefaultDoctorImage from "@/Shared/Assets/Images/DefaultDoctor.png"
import { Button } from "@/Shared/UI/Button";
import { Input } from "@/Shared/UI/Input";
import { Upload } from "./Upload";


interface RegisterPageWidgetProps {
  className?: string;
}

export const RegisterDoctorPageWidget = memo((props: RegisterPageWidgetProps) => {
  const {
    className,
  } = props;
  const { t } = useTranslation("")
 
  return (
   <HStack align="center" gap={"32"} className={classNames(cls.RegisterPageWidget)}>
   
     
      <RegisterDoctorForm />
    </HStack>
  );
});
