import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
    AdminProfileCard,
    DoctorProfileCard,
    PatientProfileCard,
} from '@/Entities/Profile';
import { VStack } from '@/Shared/UI/Stack';
import { Text } from '@/Shared/UI/Text/Text';
import { classNames } from '@/Shared/lib/classNames/classNames';
import DynamicModuleLoader, {
    ReducersList,
} from '@/Shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/Shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/Shared/lib/hooks/useInitialEffect/useInitialEffect';
import { getProfileError } from '../../Model/selectors/getProfileError/getProfileError';
import {
    getAdminProfileForm,
    getDoctorProfileForm,
    getProfileForm,
} from '../../Model/selectors/getProfileForm/getProfileForm';
import { getProfileIsLoading } from '../../Model/selectors/getProfileIsLoading/getProfileIsLoading';
import { getProfileReadonly } from '../../Model/selectors/getProfileReadonly/getProfileReadonly';
import { getProfileValidateErrors } from '../../Model/selectors/getProfileValidateErrors/getProfileValidateErrors';
import {
    fetchAdminProfileData,
    fetchDoctorProfileData,
    fetchPatientProfileData,
} from '../../Model/services/fetchProfileData/fetchProfileData';
import { profileActions, profileReducer } from '../../Model/slice/profileSlice';
import { EditableProfileCardHeader } from '../EditableProfileCardHeader/EditableProfileCardHeader';
import { ValidateProfileError } from '../../Model/consts/consts';
import {
    isUserAdmin,
    isUserDoctor,
    isUserPatient,
} from '@/Entities/ApplicationUser';

import { getProfileSuccessUpdate } from '../../Model/selectors/getProfileSuccessUpdate/getProfileSuccessUpdate';
import {
    doctorProfileActions,
    doctorProfileReducer,
} from '../../Model/slice/doctorProfileSlice';
import { DoctorCategory } from '@/Entities/DoctorCategory';
import {
    adminProfileActions,
    adminProfileReducer,
} from '../../Model/slice/adminProfileSlice';

interface EditableProfileCardProps {
    className?: string;
    id?: string;
}
const reducers: ReducersList = {
    profile: profileReducer,
    doctorProfile: doctorProfileReducer,
    adminProfile: adminProfileReducer,
};
export const EditableProfileCard = memo((props: EditableProfileCardProps) => {
    const { className, id } = props;
    const { t } = useTranslation('profile');

    const dispatch = useAppDispatch();
    const formPatientData = useSelector(getProfileForm);
    const formDoctorData = useSelector(getDoctorProfileForm);
    const formAdminData = useSelector(getAdminProfileForm);

    const isAdmin = useSelector(isUserAdmin);
    const isPatient = useSelector(isUserPatient);
    const isDoctor = useSelector(isUserDoctor);
    const error = useSelector(getProfileError);
    const isSuccessUpdate = useSelector(getProfileSuccessUpdate);
    const isLoading = useSelector(getProfileIsLoading);
    const readonly = useSelector(getProfileReadonly);
    const validateErrors = useSelector(getProfileValidateErrors);
    const validateErrorTranslates = {
        [ValidateProfileError.SERVER_ERROR]: t('Ошибка сервера'),
        [ValidateProfileError.INCORRECT_ADDRESS]: t('Некорректный адрес'),
        [ValidateProfileError.INCORRECT_FIRST_NAME]: t('Имя  обязательно'),
        [ValidateProfileError.INCORRECT_LAST_NAME]: t('Фамилия обязательна'),
        [ValidateProfileError.INCORRECT_PATRONYMIC]: t('Отчество обязательно'),
        [ValidateProfileError.INCORRECT_DATE_BIRTHDAY]: t(
            'Некорректная дата рождения',
        ),
        [ValidateProfileError.INCORRECT_PHONE_NUMBER]: t(
            'Некорректный формат телефона',
        ),
        [ValidateProfileError.NO_DATA]: t('Данные не указаны'),
    };

    useInitialEffect(() => {
        if (id) {
            if (isAdmin) {
                void dispatch(fetchAdminProfileData(id));
            }
            if (isPatient) {
                void dispatch(fetchPatientProfileData(id));
            }
            if (isDoctor) {
                void dispatch(fetchDoctorProfileData(id));
            }
        }
    });

    const onChangeFirstName = useCallback(
        (firstName?: string) => {
            if (isPatient) {
                dispatch(
                    profileActions.updateProfile({
                        firstName: firstName || '',
                    }),
                );
            }
            if (isDoctor) {
                dispatch(
                    doctorProfileActions.updateDoctorProfile({
                        firstName: firstName || '',
                    }),
                );
            }
            if (isAdmin) {
                dispatch(
                    adminProfileActions.updateAdminProfile({
                        firstName: firstName || '',
                    }),
                );
            }
        },
        [dispatch, isAdmin, isDoctor, isPatient],
    );
    const onChangeLastName = useCallback(
        (lastName?: string) => {
            if (isPatient) {
                dispatch(
                    profileActions.updateProfile({ lastName: lastName || '' }),
                );
            }
            if (isDoctor) {
                dispatch(
                    doctorProfileActions.updateDoctorProfile({
                        lastName: lastName || '',
                    }),
                );
            }
            if (isAdmin) {
                dispatch(
                    adminProfileActions.updateAdminProfile({
                        lastName: lastName || '',
                    }),
                );
            }
        },
        [dispatch, isAdmin, isDoctor, isPatient],
    );
    const onChangePatronymic = useCallback(
        (patronymic?: string) => {
            if (isPatient) {
                dispatch(
                    profileActions.updateProfile({
                        patronymic: patronymic || '',
                    }),
                );
            }
            if (isDoctor) {
                dispatch(
                    doctorProfileActions.updateDoctorProfile({
                        patronymic: patronymic || '',
                    }),
                );
            }
            if (isAdmin) {
                dispatch(
                    adminProfileActions.updateAdminProfile({
                        patronymic: patronymic || '',
                    }),
                );
            }
        },
        [dispatch, isAdmin, isDoctor, isPatient],
    );

    const onChangeAddress = useCallback(
        (address?: string) => {
            if (isPatient) {
                dispatch(
                    profileActions.updateProfile({ address: address || '' }),
                );
            }
            if (isDoctor) {
                dispatch(
                    doctorProfileActions.updateDoctorProfile({
                        address: address || '',
                    }),
                );
            }
        },
        [dispatch, isDoctor, isPatient],
    );
    const onChangePhoneNumber = useCallback(
        (phoneNumber?: string) => {
            if (isPatient) {
                dispatch(
                    profileActions.updateProfile({
                        phoneNumber: { value: phoneNumber || '' },
                    }),
                );
            }

            if (isDoctor) {
                dispatch(
                    doctorProfileActions.updateDoctorProfile({
                        phoneNumber: { value: phoneNumber || '' },
                    }),
                );
            }
        },
        [dispatch, isDoctor, isPatient],
    );
    const onChangePassportNumber = useCallback(
        (passportNumber?: string) => {
            dispatch(
                profileActions.updateProfile({
                    passportNumber: passportNumber || '',
                }),
            );
        },
        [dispatch],
    );
    const onChangeDateBirthday = useCallback(
        (value?: string) => {
            if (isPatient) {
                dispatch(
                    profileActions.updateProfile({ dateBirthday: value || '' }),
                );
            }
            if (isDoctor) {
                dispatch(
                    doctorProfileActions.updateDoctorProfile({
                        dateBirthday: value || '',
                    }),
                );
            }
        },
        [dispatch, isDoctor, isPatient],
    );

    const onChangeAvatar = useCallback(
        (value?: string) => {
            dispatch(profileActions.updateProfile({ avatar: value || '' }));
        },
        [dispatch],
    );
    const onChangePhoto = useCallback(
        (value?: string) => {
            dispatch(
                doctorProfileActions.updateDoctorProfile({
                    photo: value || '',
                }),
            );
        },
        [dispatch],
    );

    const onChangeCategory = useCallback(
        (category?: DoctorCategory) => {
            dispatch(doctorProfileActions.updateDoctorProfile({ category }));
        },
        [dispatch],
    );
    const onChangeExperience = useCallback(
        (experience?: string) => {
            dispatch(
                doctorProfileActions.updateDoctorProfile({
                    experience: experience || '',
                }),
            );
        },
        [dispatch],
    );
    const onChangeCabinetNumber = useCallback(
        (cabinet?: string) => {
            dispatch(
                doctorProfileActions.updateDoctorProfile({
                    cabinetNumber: cabinet || '',
                }),
            );
        },
        [dispatch],
    );

    return (
        <DynamicModuleLoader reducers={reducers}>
            <VStack gap={'16'} max className={classNames('', {}, [className])}>
                <EditableProfileCardHeader />
                {error && (
                    <Text
                        align={'center'}
                        variant={'error'}
                        text={error}
                        data-testid={'EditableProfileCard.Error'}
                    />
                )}
                {validateErrors?.length &&
                    validateErrors.map((err) => (
                        <Text
                            key={err}
                            variant={'error'}
                            text={validateErrorTranslates[err]}
                            data-testid={'EditableProfileCard.Error'}
                        />
                    ))}
                {isSuccessUpdate && (
                    <Text
                        align={'center'}
                        variant={'accent'}
                        bold
                        text={'Данные профиля обновлены'}
                        data-testid={'EditableProfileCard.Error'}
                    />
                )}
                {isDoctor && (
                    <DoctorProfileCard
                        data={formDoctorData}
                        isLoading={isLoading}
                        error={error}
                        readonly={readonly}
                        onChangeFirstName={onChangeFirstName}
                        onChangeLastName={onChangeLastName}
                        onChangePatronymic={onChangePatronymic}
                        onChangeDateBirthday={onChangeDateBirthday}
                        onChangePhoto={onChangePhoto}
                        onChangeCategory={onChangeCategory}
                        onChangeExperience={onChangeExperience}
                        onChangeAddress={onChangeAddress}
                        onChangeCabinetNumber={onChangeCabinetNumber}
                        onChangePhoneNumber={onChangePhoneNumber}
                    />
                )}
                {isAdmin && (
                    <AdminProfileCard
                        data={formAdminData}
                        isLoading={isLoading}
                        error={error}
                        readonly={readonly}
                        onChangeFirstName={onChangeFirstName}
                        onChangeLastName={onChangeLastName}
                        onChangePatronymic={onChangePatronymic}
                    />
                )}
                {isPatient && (
                    <PatientProfileCard
                        data={formPatientData}
                        isLoading={isLoading}
                        error={error}
                        readonly={readonly}
                        onChangeFirstName={onChangeFirstName}
                        onChangeLastName={onChangeLastName}
                        onChangePatronymic={onChangePatronymic}
                        onChangeDateBirthday={onChangeDateBirthday}
                        // onChangeUsername={onChangeUsername}
                        onChangeAvatar={onChangeAvatar}
                        onChangeAddress={onChangeAddress}
                        onChangePhoneNumber={onChangePhoneNumber}
                        onChangePassportNumber={onChangePassportNumber}
                    />
                )}
            </VStack>
        </DynamicModuleLoader>
    );
});
