/* eslint-disable react/display-name */
import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import cls from "./MainPageInfoAbout.module.scss";
import { classNames } from "@/Shared/lib/classNames/classNames";
import { HStack, VStack } from "@/Shared/UI/Stack";
import { Text } from "@/Shared/UI/Text";
import AboutImage from "@/Shared/Assets/Images/about-img.jpg"
import { AppImage } from "@/Shared/UI/AppImage";
import { Button } from "@/Shared/UI/Button";
import { AppLink } from "@/Shared/UI/AppLink";
import { getRoutePatientRegister } from "@/Shared/const/router";
import { useSelector } from "react-redux";
import { getUserAuthData } from "@/Entities/ApplicationUser";

interface MainPageInfoAboutProps {
  className?: string;
}

export const MainPageInfoAbout = memo((props: MainPageInfoAboutProps) => {
  const {
    className,
  } = props;
  const { t } = useTranslation("main")
const userData = useSelector(getUserAuthData);
  
  return (
      <VStack align="center" gap={"8"} >
          <Text align={"center"} bold variant={"primary"} size={"l"}
              text={t("О нас")} />
          <HStack gap={"16"} className={classNames(cls.MainPageLIstInfoItemHome)}>
            <AppImage
            src={AboutImage}
            width={"40%"}
            height={"60%"} 
            className={classNames(cls.imageBorder, {}, [])}
              />
               <VStack gap={"16"} className={classNames(cls.aboutContent)}>
                  <Text align={"center"}
                      title={t("Лучшее обслуживание в городе, передовые технологии. Наш девиз - все для посетителей")}
                      variant="primary"
                      size="l" />
          {!userData && 
       
            <Button size="m" className={classNames(cls.buttonAlign, {}, [])}>
              <AppLink to={getRoutePatientRegister()}>
            {t("Зарегистрироваться")}
          </AppLink></Button>
       }
           </VStack>      
        </HStack>
    </VStack>
  );
});
