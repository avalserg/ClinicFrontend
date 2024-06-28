/* eslint-disable react/display-name */
import { memo } from "react";
import cls from "./MainPageListInfoItemHome.module.scss";
import { useTranslation } from "react-i18next";
import  HospitalImage from "@/Shared/Assets/Images/hospital.jpg"

import { AppImage } from "@/Shared/UI/AppImage";
import { HStack, VStack } from "@/Shared/UI/Stack";
import { Text } from "@/Shared/UI/Text";
import { Button } from "@/Shared/UI/Button";
import { classNames } from "@/Shared/lib/classNames/classNames";
import { AppLink } from "@/Shared/UI/AppLink";
import { getRoutePatientRegister } from "@/Shared/const/router";
import { useSelector } from "react-redux";
import { getUserAuthData } from "@/Entities/ApplicationUser";

interface MainPageListInfoItemHomeProps {
  className?: string;
}

export const MainPageListInfoItemHome = memo((props: MainPageListInfoItemHomeProps) => {
  const {
    className,
  } = props;
  const { t } = useTranslation("main")
const userData = useSelector(getUserAuthData);
  return (    
    <HStack align="center" gap={"32"} className={classNames(cls.MainPageLIstInfoItemHome)}>
      
      <AppImage
        src={HospitalImage}
        width={"50%"}
        height={"50%"} 
        className={classNames(cls.homeContent, {},[cls.imageBorder])}
        />
      
      <VStack gap={"8"} className={classNames(cls.homeContent)}>
        <Text title={t("Мы заботимся о вашем здоровье")} align="center" variant="primary" size="l"/>
        <Text
          align="center"
          // eslint-disable-next-line max-len
          text={t("У человека с хорошим физическим здоровьем функции и процессы организма, скорее всего, будут работать на пике")}
          variant="primary"
          size="m" />
        {!userData &&
          <Button size="m" className={classNames(cls.buttonAlign, {}, [])}>
            <AppLink to={getRoutePatientRegister()}>
            {t("Зарегистрироваться")}
          </AppLink></Button>}
       
      </VStack>      
     </HStack>         
  );
});


