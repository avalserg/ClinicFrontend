/* eslint-disable react/display-name */
import { memo, useEffect, useState } from 'react';
import cls from './MainPageInfoReviews.module.scss';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/Shared/lib/classNames/classNames';
import { HStack, VStack } from '@/Shared/UI/Stack';
import { Text } from '@/Shared/UI/Text';
import PatientIcon from '@/Shared/Assets/Icons/patient.svg';
import { Card } from '@/Shared/UI/Card';
import { Icon } from '@/Shared/UI/Icon';
import DynamicModuleLoader, {
    ReducersList,
} from '@/Shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { reviewsPageReducer } from '@/Pages/ReviewsPage/Model/slices/reviewsPageSlice';
import { getReviewsData } from '@/Pages/ReviewsPage/Model/selectors/reviewsPageSelectors';
import { fetchAllReviewsList } from '@/Pages/ReviewsPage/Model/services/fetchReviewsList';
import { useInitialEffect } from '@/Shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/Shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Review } from '@/Entities/Review';
import { shuffle } from '@/Shared/Helpers/shuffleRandomFunction/shuffleRandomFunction';
import { AppImage } from '@/Shared/UI/AppImage';
interface MainPageInfoReviewsProps {
    className?: string;
}
const reducers: ReducersList = {
    reviewsPage: reviewsPageReducer,
};
export const MainPageInfoReviews = memo((props: MainPageInfoReviewsProps) => {
    const { className } = props;
    const { t } = useTranslation('main');
    const [itemsData, setItemsData] = useState<Review[] | undefined>(undefined);
    const reviewsData = useSelector(getReviewsData);
    const dispatch = useAppDispatch();
    useInitialEffect(async () => {
        await dispatch(fetchAllReviewsList());
    });
    useEffect(() => {
        if (reviewsData?.items) {
            const items = shuffle(
                reviewsData.items,
                reviewsData.items.length < 4 ? reviewsData.items.length : 4,
            );
            setItemsData(items);
        }
    }, [reviewsData?.items]);

    return (
        <DynamicModuleLoader removeAfterUnmount reducers={reducers}>
            <VStack
                align="center"
                gap="8"
                className={classNames(cls.MainPageInfoReviews)}
                max
            >
                <Text
                    text={t('Отзывы о поликлинике')}
                    size="l"
                    bold
                    variant={'primary'}
                />
                <HStack gap={'8'} className={classNames(cls.stretchAlign)} max>
                    {itemsData ? (
                        itemsData.map((item) => (
                            <>
                                <Card
                                    className={classNames(
                                        cls.cardContent,
                                        {},
                                        [],
                                    )}
                                    variant={'outlined'}
                                    padding={'24'}
                                    border={'partialRound'}
                                >
                                    <Icon Svg={PatientIcon} />
                                    <Text
                                        align={'center'}
                                        // @ts-ignore
                                        text={t(item.lastName)}
                                        variant="error"
                                        size="m"
                                    />
                                    <Text
                                        align={'center'}
                                        // @ts-ignore
                                        text={t(item.firstName)}
                                        variant="error"
                                        size="m"
                                    />

                                    <Text
                                        align={'center'}
                                        // @ts-ignore
                                        text={t(item.description)}
                                        variant={'accent'}
                                        size="m"
                                    />
                                </Card>
                            </>
                        ))
                    ) : (
                        <Text
                            align={'center'}
                            // @ts-ignore
                            text={t('Нет отзывов')}
                            variant="error"
                            size="m"
                        />
                    )}
                </HStack>
            </VStack>
        </DynamicModuleLoader>
    );
});
