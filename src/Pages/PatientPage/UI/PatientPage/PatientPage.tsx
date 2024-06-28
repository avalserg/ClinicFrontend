/* eslint-disable react/display-name */
import { memo } from "react";
import { useTranslation } from "react-i18next";
import cls from "./PatientPage.module.scss";
import { Page } from "@/Widgets/Page";
import { Text } from "@/Shared/UI/Text";
import { PatientPageTableInfo } from "../PatientPageTableInfo/PatientPageTableInfo";

interface PatientPageProps {
  className?: string;
}

export const PatientPage = memo((props: PatientPageProps) => {
  const {
    className,
  } = props;
  const { t } = useTranslation("")

  return (
      <Page data-testid={'DoctorPage'}>
          <Text
              align="center"
              variant={'accent'}
              title={t('Список пациентов')}
              className={cls.PatientPageHeader}
          />
          <PatientPageTableInfo />
      </Page>
  );
});
export default PatientPage;
