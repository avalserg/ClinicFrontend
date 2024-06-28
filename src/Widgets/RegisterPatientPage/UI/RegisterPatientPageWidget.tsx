import { memo } from "react";
import { useTranslation } from "react-i18next";
import cls from "./RegisterPatientPageWidget.module.scss";
import { classNames } from "@/Shared/lib/classNames/classNames";
import { HStack } from "@/Shared/UI/Stack";
import { AppImage } from "@/Shared/UI/AppImage";
import { RegisterPatientForm } from "@/Features/RegisterPatientForm";
import RegisterImage from "@/Shared/Assets/Images/register.png"




interface RegisterPageWidgetProps {
  className?: string;
}

export const RegisterPatientPageWidget = memo((props: RegisterPageWidgetProps) => {
  const {
    className,
  } = props;
  const { t } = useTranslation("")

  return (
   <HStack align="center" gap={"32"} className={classNames(cls.RegisterPageWidget)}>
    
      <AppImage
        src={RegisterImage}
        width={"50%"}
        height={"50%"} 
        className={classNames(cls.registerContent)}
      />
    
      <RegisterPatientForm />
    </HStack>
  );
});
