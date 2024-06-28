import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Page } from '@/Widgets/Page';
import { Text } from '@/Shared/UI/Text';
import { ReviewsPageButtonsItems } from '../ReviewsPageButtonsItems/ReviewsPageButtonsItems';
import { ReviewsPageTableInfo } from '../ReviewsPageTableInfo/ReviewsPageTableInfo';
import { isUserPatient } from '@/Entities/ApplicationUser';

const ReviewsPage = () => {
    const { t } = useTranslation();
    const isPatient = useSelector(isUserPatient);
    return (
        <Page data-testid={'ReviewsPage'}>
            <Text
                align="center"
                variant={'accent'}
                title={t('Отзывы о поликлинике')}
            />
            {isPatient && <ReviewsPageButtonsItems />}
            <ReviewsPageTableInfo />
        </Page>
    );
};

export default ReviewsPage;
