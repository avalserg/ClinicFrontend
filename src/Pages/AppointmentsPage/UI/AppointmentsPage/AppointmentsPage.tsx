import { useTranslation } from 'react-i18next';

import { Page } from '@/Widgets/Page';

import { Text } from '@/Shared/UI/Text';
import { AppointmentsPageTableInfo } from '../AppointmentsPageTableInfo/AppointmentsPageTableInfo';

const AppointmentsPage = () => {
    const { t } = useTranslation();

    return (
        <Page data-testid={'RegisterPage'}>
            <Text
                align="center"
                variant="error"
                title={t('Приемы')}
            />

            <AppointmentsPageTableInfo />
        </Page>
    );
};

export default AppointmentsPage;
