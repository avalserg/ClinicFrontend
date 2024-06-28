import { useTranslation } from 'react-i18next';
import { Page } from '@/Widgets/Page';
import { Text } from '@/Shared/UI/Text';
import { PatientTicketsPageTableInfo } from '../PatientTicketPageTableInfo/PatientTicketPageTableInfo';

const PatientTicketPage = () => {
    const { t } = useTranslation();

    return (
        <Page data-testid={'RegisterPage'}>
            <Text align="center" variant="error" title={t('Талоны на прием')} />
            {/* <PatientTicketsButtonsItems /> */}
            <PatientTicketsPageTableInfo />
        </Page>
    );
};

export default PatientTicketPage;
