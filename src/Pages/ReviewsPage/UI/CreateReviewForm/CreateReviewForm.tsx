import { useTranslation } from 'react-i18next';
import { memo, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useForceUpdate } from '@react-spring/shared';
import { classNames } from '@/Shared/lib/classNames/classNames';
import cls from './CreateReviewForm.module.scss';

import DynamicModuleLoader, {
    ReducersList,
} from '@/Shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/Shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Input } from '@/Shared/UI/Input';
import { Button } from '@/Shared/UI/Button';
import { Text } from '@/Shared/UI/Text';
import { HStack, VStack } from '@/Shared/UI/Stack';
import { Icon } from '@/Shared/UI/Icon';
import LoginIcon from '@/Shared/Assets/Icons/LoginFormInputUser.svg';
import PasswordIcon from '@/Shared/Assets/Icons/LoginFormInputPassword.svg';
import {
    createReviewActions,
    createReviewReducer,
} from '../../Model/slices/createReviewSlice';
import { reviewsPageReducer } from '../../Model/slices/reviewsPageSlice';
import { createReview } from '../../Model/services/createReview';
import {
    getReviewDescription,
    getReviewsPageError,
    getReviewsPageIsLoading,
} from '../../Model/selectors/reviewsPageSelectors';
import { TextArea } from '@/Shared/UI/TextArea';
import { fetchReviewsList } from '../../Model/services/fetchReviewsList';

export interface CreateReviewFormProps {
    className?: string;
    // вызывается в случае успешного запроса
    onSuccess: () => void;
}
const initialReducers: ReducersList = {
    review: createReviewReducer,
};
const CreateReviewForm = memo(
    ({ className, onSuccess }: CreateReviewFormProps) => {
        const { t } = useTranslation();

        const dispatch = useAppDispatch();
        // selectors
        const reviewDescription = useSelector(getReviewDescription);
        const reviewIsLoading = useSelector(getReviewsPageIsLoading);
        const reviewErrror = useSelector(getReviewsPageError);
        const [isText, setIsText] = useState(false);
       
        // useCallback не меняет ссылку
        const onChangeDescription = useCallback(
            (value: string) => {
                dispatch(createReviewActions.setReviewDescription(value));
            },
            [dispatch],
        );

        const onReviewCreate = useCallback(async () => {
            const result = await dispatch(createReview({}));
            if (result.meta.requestStatus === 'fulfilled') {
                dispatch(fetchReviewsList());
                setIsText(true);
                setTimeout(() => {
                    onSuccess();
                }, 1500);
                // forceUpdate();
            }
        }, [dispatch, onSuccess]);

        return (
            <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
                <VStack
                    gap={'16'}
                    align="center"
                    className={classNames(cls.LoginForm, {}, [className])}
                >
                    {!isText ? (
                        <Text title={t('Текст отзыва')} />
                    ) : (
                        <Text title={t('Отзыв создан')} variant={'accent'} />
                    )}
                    {reviewErrror && (
                        <Text
                            text={t(reviewErrror)}
                            variant={'error'}
                            align="center"
                        />
                    )}
                    {!isText && (
                        <>
                            <HStack gap={'8'} max>
                                <TextArea
                                    autoFocus
                                    className={cls.textarea}
                                    placeholder={t(
                                        'Введите текст отзыва не менее 10 символов',
                                    )}
                                    onChange={onChangeDescription}
                                    value={reviewDescription}
                                />
                            </HStack>

                            <Button
                                onClick={onReviewCreate}
                                className={cls.loginBtn}
                                disabled={
                                    reviewIsLoading
                                    // reviewDescription!.length < 3
                                }
                            >
                                {t('Создать отзыв')}
                            </Button>
                        </>
                    )}
                </VStack>
            </DynamicModuleLoader>
        );
    },
);
export default CreateReviewForm;
