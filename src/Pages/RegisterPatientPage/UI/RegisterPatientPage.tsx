import { useTranslation } from "react-i18next";
import cls from "./RegisterPage.module.scss"
import { Page } from "@/Widgets/Page";

import { HStack } from "@/Shared/UI/Stack";
import { AppImage } from "@/Shared/UI/AppImage";
import RegisterImage from "@/Shared/Assets/Images/register.png"
import { classNames } from "@/Shared/lib/classNames/classNames";
import { RegisterPatientPageWidget } from "@/Widgets/RegisterPatientPage";
const RegisterPatientPage = () => {
  const { t } = useTranslation();
  return <Page data-testid={"RegisterPage"}>
    <RegisterPatientPageWidget/>
    
  </Page>;
};

export default RegisterPatientPage;
