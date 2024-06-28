import { useTranslation } from 'react-i18next';
import { Page } from '@/Widgets/Page';
import { Text } from '@/Shared/UI/Text';
import { DoctorPageTableInfo } from '../DoctorPageTableInfo/DoctorPageTableInfo';
import cls from './DoctorPage.module.scss';

const DoctorPage = () => {
    const { t } = useTranslation();

    return (
        <Page data-testid={'DoctorPage'}>
            <Text
                align="center"
                variant={'accent'}
                title={t('Список врачей')}
                className={cls.DotorPageHeader}
            />
            <DoctorPageTableInfo />
        </Page>
    );
};

export default DoctorPage;
