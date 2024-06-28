/* eslint-disable react/display-name */
import { memo } from "react";
import { useTranslation } from "react-i18next";

import { MainPageListInfoItemHome } from "../MainPageInfoItemHome/MainPageListInfoItemHome";
import { VStack } from "@/Shared/UI/Stack";
import { MainPageInfoCardsItems } from "../MainPageInfoCardsItems/MainPageInfoCardsItems";
import { Text } from "@/Shared/UI/Text";
import { MainPageInfoAbout } from "../MainPageInfoAbout/MainPageInfoAbout";
import { MainPageInfoServices } from "../MainPageInfoServices/MainPageInfoServices";
import { MainPageInfoDoctors } from "../MainPageDoctorsInfo/MainPageInfoDoctors";
import { MainPageInfoReviews } from "../MainPageInfoReviews/MainPageInfoReviews";

interface MainPageListInfoProps {
  className?: string;
}

export const MainPageListInfoWidget = memo((props: MainPageListInfoProps) => {
  const {
    className,
  } = props;
  const { t } = useTranslation("")

  return (
    <VStack gap={"16"}>    
      <MainPageListInfoItemHome/>
      <MainPageInfoCardsItems />
      <MainPageInfoAbout />
      <MainPageInfoServices/>
      <MainPageInfoDoctors />
     <MainPageInfoReviews/> 
    </VStack>
  );
});


