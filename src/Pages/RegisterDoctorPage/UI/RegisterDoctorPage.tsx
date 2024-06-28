import { useTranslation } from "react-i18next";
import cls from "./RegisterDoctorPage.module.scss"
import { Page } from "@/Widgets/Page";

import { HStack } from "@/Shared/UI/Stack";
import { AppImage } from "@/Shared/UI/AppImage";
import RegisterImage from "@/Shared/Assets/Images/register.png"
import { classNames } from "@/Shared/lib/classNames/classNames";
import { RegisterDoctorPageWidget } from "@/Widgets/RegisterDoctorPage";
const RegisterDoctorPage = () => {
  const { t } = useTranslation();
  return <Page data-testid={"RegisterPage"}>
    <RegisterDoctorPageWidget/>
    
  </Page>;
};

export default RegisterDoctorPage;