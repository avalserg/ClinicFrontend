/* eslint-disable multiline-ternary */
/* eslint-disable react/display-name */
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/Shared/lib/classNames/classNames';
import {
    getUserAuthData,
    isUserAdmin,
    isUserDoctor,
    isUserPatient,
} from '@/Entities/ApplicationUser';
import { getProfileData } from '../../Model/selectors/getProfileData/getProfileData';
import { getProfileReadonly } from '../../Model/selectors/getProfileReadonly/getProfileReadonly';
import {
    updateAdminProfileData,
    updateDoctorProfileData,
    updatePatientProfileData,
} from '../../Model/services/updateProfileData/updateProfileData';
import { profileActions } from '../../Model/slice/profileSlice';

import { Button } from '@/Shared/UI/Button';
import { HStack } from '@/Shared/UI/Stack';
import { useAppDispatch } from '@/Shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Text } from '@/Shared/UI/Text';
import { Card } from '@/Shared/UI/Card';

interface EditableProfileCardHeaderProps {
    className?: string;
}

export const EditableProfileCardHeader = memo(
    (props: EditableProfileCardHeaderProps) => {
        const { className } = props;
        const { t } = useTranslation('profile');
        // hidden button edit for other profiles
        const authData = useSelector(getUserAuthData);
        const profileData = useSelector(getProfileData);

        const readonly = useSelector(getProfileReadonly);
        const dispatch = useAppDispatch();
        const isPatient = useSelector(isUserPatient);
        const isDoctor = useSelector(isUserDoctor);
        const isAdmin = useSelector(isUserAdmin);
        // doctor and patient cannot be edited profile
        const canEdit =
            authData?.applicationUserId === profileData?.applicationUserId &&
            !isDoctor &&
            !isPatient;
        const onEdit = useCallback(() => {
            dispatch(profileActions.setReadonly(false));
        }, [dispatch]);

        const onCancelEdit = useCallback(() => {
            dispatch(profileActions.cancelEdit());
        }, [dispatch]);

        const onSave = useCallback(() => {
            if (isPatient) {
                void dispatch(updatePatientProfileData());
            }
            if (isDoctor) {
                void dispatch(updateDoctorProfileData());
            }
            if (isAdmin) {
                void dispatch(updateAdminProfileData());
            }
        }, [dispatch, isAdmin, isDoctor, isPatient]);

        return (
            <Card border={'partialRound'} padding={'24'} max>
                <HStack
                    max
                    justify={'between'}
                    className={classNames('', {}, [className])}
                >
                    <Text title={t('Профиль')} />
                    {canEdit && (
                        <>
                            {readonly ? (
                                <Button
                                    data-testid={
                                        'EditableProfileCardHeader.EditButton'
                                    }
                                    onClick={onEdit}
                                >
                                    {t('Редактировать профиль')}
                                </Button>
                            ) : (
                                <HStack gap={'8'}>
                                    <Button
                                        data-testid={
                                            'EditableProfileCardHeader.CancelButton'
                                        }
                                        onClick={onCancelEdit}
                                        color={'error'}
                                    >
                                        {t('Отменить')}
                                    </Button>
                                    <Button
                                        data-testid={
                                            'EditableProfileCardHeader.SaveButton'
                                        }
                                        onClick={onSave}
                                        color={'success'}
                                    >
                                        {t('Сохранить')}
                                    </Button>
                                </HStack>
                            )}
                        </>
                    )}
                </HStack>
            </Card>
        );
    },
);
