import { useTranslation } from "react-i18next";
import { Page } from "@/Widgets/Page";
import { AdminPanelButtonsItems, AdminPanelCardItems, AdminPanelStatisticsDiagrams } from "@/Widgets/AdminPanelInfo";

const AdminPanelPage = () => {
  const { t } = useTranslation("admin");
  return <Page data-testid={"AdminPanelPage"}>
    <AdminPanelButtonsItems/>
    <AdminPanelCardItems/>
    <AdminPanelStatisticsDiagrams/>
  </Page>;
};

export default AdminPanelPage;
