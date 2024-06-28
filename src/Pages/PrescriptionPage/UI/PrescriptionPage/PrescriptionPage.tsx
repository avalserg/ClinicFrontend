import { useTranslation } from 'react-i18next';
import { Page } from '@/Widgets/Page';
import { Text } from '@/Shared/UI/Text';
import { PrescriptionPageTableInfo } from '../PrescriptionPageTableInfo/PrescriptionPageTableInfo';

const PrescriptionPage = () => {
    const { t } = useTranslation();

    return (
        <Page data-testid={'RegisterPage'}>
            <Text align="center" variant="error" title={t('Рецепты')} />
            <PrescriptionPageTableInfo />
        </Page>
    );
};

export default PrescriptionPage;
