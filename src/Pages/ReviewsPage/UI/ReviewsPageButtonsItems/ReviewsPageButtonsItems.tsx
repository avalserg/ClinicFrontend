/* eslint-disable i18next/no-literal-string */
import { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './ReviewsPageButtonsItems.module.scss';
import { classNames } from '@/Shared/lib/classNames/classNames';
import { HStack } from '@/Shared/UI/Stack';
import { Button } from '@/Shared/UI/Button';
import { CreateReviewModal } from '../CreateReviewModal/CreateReviewModal';
import { Text } from '@/Shared/UI/Text';
import { useSelector } from 'react-redux';
import {
    getReviewsPageError,
    getReviewsPageIsLoading,
} from '../../Model/selectors/reviewsPageSelectors';
import { useAppDispatch } from '@/Shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
    fetchAllReviewsList,
    fetchReviewsList,
} from '../../Model/services/fetchReviewsList';

interface ReviewsPageButtonsItemsProps {
    className?: string;
}

export const ReviewsPageButtonsItems = memo(
    (props: ReviewsPageButtonsItemsProps) => {
        const { className } = props;
        const { t } = useTranslation('');
        const [isCreateReviewModal, setIsCreateReviewModal] = useState(false);
        const [isShowAllReviews, setIsShowAllReviews] = useState(true);
        const dispatch = useAppDispatch();
        const onCloseModal = useCallback(() => {
            setIsCreateReviewModal(false);
        }, []);
        const onShowModal = useCallback(() => {
            setIsCreateReviewModal(true);
        }, []);

        const onShowAllReviews = useCallback(async () => {
            dispatch(fetchAllReviewsList());
            setIsShowAllReviews(true);
        }, [dispatch]);
        const onShowMyReviews = useCallback(async () => {
            dispatch(fetchReviewsList());
            setIsShowAllReviews(false);
        }, [dispatch]);
        return (
            <div
                className={classNames(cls.ReviewsPageButtonsItems, {}, [
                    className,
                ])}
            >
                <HStack wrap="wrap" gap="16">
                    <Button color={'update'} onClick={onShowModal}>
                        Создать отзыв
                    </Button>
                    {!isShowAllReviews ? (
                        <Button color={'success'} onClick={onShowAllReviews}>
                            Все отзывы
                        </Button>
                    ) : (
                        <Button color={'normal'} onClick={onShowMyReviews}>
                            Мои отзывы
                        </Button>
                    )}

                    {isCreateReviewModal && (
                        <CreateReviewModal
                            onClose={onCloseModal}
                            isOpen={isCreateReviewModal}
                        />
                    )}
                </HStack>
            </div>
        );
    },
);
function dispatch(arg0: any) {
    throw new Error('Function not implemented.');
}
