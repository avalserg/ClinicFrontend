import { useTranslation } from "react-i18next";
import { VStack } from "@/Shared/UI/Stack";
import { Page } from "@/Widgets/Page";
import { MainPageListInfoWidget } from "@/Widgets/MainPageInfo";


const MainPage = () => {
  const { t } = useTranslation();
  
  return (
    <Page data-testid={"MainPage"}>
     <MainPageListInfoWidget/>
    </Page>
  );
};

export default MainPage;
