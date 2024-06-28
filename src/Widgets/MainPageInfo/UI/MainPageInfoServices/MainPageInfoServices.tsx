/* eslint-disable react/display-name */
import { memo } from "react";
import cls from "./MainPageInfoServices.module.scss";
import { useTranslation } from "react-i18next";
import { classNames } from "@/Shared/lib/classNames/classNames";
import { HStack, VStack } from "@/Shared/UI/Stack";
import { Card } from "@/Shared/UI/Card";
import { Icon } from "@/Shared/UI/Icon";
import DoctorIcon from "@/Shared/Assets/Icons/doctor.svg"
import HospitalIcon from "@/Shared/Assets/Icons/hospital.svg"
import { Text } from "@/Shared/UI/Text";
import FreeExamination from "@/Shared/Assets/Icons/free_examination.svg"
import ServiceTime from "@/Shared/Assets/Icons/reception.svg"
import Medicine from "@/Shared/Assets/Icons/medicine.svg"
import Personal from "@/Shared/Assets/Icons/personal.svg"

interface MainPageInfoServicesProps {
  className?: string;
}

export const MainPageInfoServices = memo((props: MainPageInfoServicesProps) => {
  const {
    className,
  } = props;
  const { t } = useTranslation("main")

  return (
      <VStack align={"center"} gap={"8"} max>
          <Text align={"center"} bold variant={"primary"} size={"l"}
              text={t("Наши услуги")} />
          <HStack className={classNames(cls.stretchAlign)} gap="8" max>
          <Card className={classNames(cls.cardContent)}   variant={"outlined"} padding={"8"}
                border={"partialRound"}>
               <Icon Svg={FreeExamination} />
               <Text align={"center"} text={t("Бесплатное обследование")} variant={"accent"} size="m"/>
              <Text align={"center"} text={t("Для зарегистрированных пользователей осуществляется бесплатное обследование")}
                  variant="primary" size="s" />
          </Card>
          <Card className={classNames(cls.cardContent)}   variant={"outlined"} padding={"8"}
                border={"partialRound"}>
               <Icon Svg={ServiceTime} />
               <Text align={"center"} text={t("Обслуживание с 8 до 20")} variant="accent" size="m"/>
               <Text align={"center"} text={t("Работаем с 8 до 20 без перерывов")}
                  variant="primary" size="s" />
          </Card>
          <Card className={classNames(cls.cardContent)}   variant={"outlined"} padding={"8"}
                border={"partialRound"}>
               <Icon Svg={DoctorIcon} />
               <Text align={"center"} text={t("Квалифицированные врачи")} variant="accent" size="m"/>
              <Text align={"center"} text={t("Все врачи обладают достаточной квалификацией")}
                  variant="primary" size="s" />
          </Card>
              
          </HStack>
          <HStack className={classNames(cls.stretchAlign)} gap="8" max>
              
          <Card className={classNames(cls.cardContent)}   variant={"outlined"} padding={"8"}
                border={"partialRound"}>
               <Icon Svg={Medicine} />
               <Text align={"center"} text={t("Назначение лекарств")} variant="accent" size="m"/>
              <Text align={"center"} text={t("Выписываем лекарства по рецептам передовых фармацевтических компаний")}
                  variant="primary" size="s" />
          </Card>
          <Card className={classNames(cls.cardContent)} variant={"outlined"} padding={"8"}
                border={"partialRound"}>
               <Icon Svg={HospitalIcon} />
               <Text align={"center"} text={t("Запись на госпитализацию")} variant="accent" size="m"/>
              <Text align={"center"} text={t("Производим запись на госпитализацию")}
                  variant="primary" size="s" />
          </Card>
          <Card className={classNames(cls.cardContent)} variant={"outlined"} padding={"8"}
                border={"partialRound"}>
               <Icon Svg={Personal} />
               <Text align={"center"} text={t("Вежливый персонал")} variant="accent" size="m"/>
              <Text align={"center"} text={t("Наш персонал будет всегда с Вами вежлив")}
                  variant="primary" size="s" />
          </Card>
         
          </HStack>
          
      </VStack>
  );
});
