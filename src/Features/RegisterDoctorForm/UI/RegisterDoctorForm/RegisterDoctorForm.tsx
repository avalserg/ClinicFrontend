/* eslint-disable max-len */
import { useTranslation } from 'react-i18next';
import { memo, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/Shared/lib/classNames/classNames';
import cls from './RegisterDoctorForm.module.scss';
import DynamicModuleLoader, {
    ReducersList,
} from '@/Shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/Shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Input } from '@/Shared/UI/Input';
import { Button } from '@/Shared/UI/Button';
import { Text } from '@/Shared/UI/Text';
import { HStack, VStack } from '@/Shared/UI/Stack';
import {
    DoctorCategory,
    DoctorCategorySelect,
} from '@/Entities/DoctorCategory';
import {
    registerDoctorActions,
    registerDoctorReducer,
} from '../../Model/slice/registerDoctorSlice';
import { getRegisterDoctorFirstName } from '../../Model/selectors/getRegisterDoctorFirstName/getRegisterDoctorFirstName';
import { getRegisterDoctorLastName } from '../../Model/selectors/getRegisterDoctorLastName/getRegisterDoctorLastName';
import { getRegisterDoctorPatronymic } from '../../Model/selectors/getRegisterDoctorPatronymic/getRegisterDoctorPatronymic';

import { getRegisterDoctorDateBirthday } from '../../Model/selectors/getRegisterDoctorDateBirthday/getRegisterDoctorDateBirthday';
import { getRegisterDoctorCategory } from '../../Model/selectors/getRegisterDoctorCategory/getRegisterDoctorCategory';
import { getRegisterDoctorPhoneNumber } from '../../Model/selectors/getRegisterDoctorPhoneNumber/getRegisterDoctorPhoneNumber';
import { getRegisterDoctorPassword } from '../../Model/selectors/getRegisterDoctorPassword/getRegisterDoctorPassword';
import { getRegisterDoctorCabinetNumber } from '../../Model/selectors/getRegisterDoctorCabinetNumber/getRegisterDoctorCabinetNumber';
import { getRegisterDoctorSpeciality } from '../../Model/selectors/getRegisterDoctorSpeciality/getRegisterDoctorSpeciality';
import { getRegisterDoctorExperience } from '../../Model/selectors/getRegisterDoctorExperience/getRegisterDoctorExperience';
import { getRegisterDoctorLogin } from '../../Model/selectors/getRegisterDoctorLogin/getRegisterDoctorLogin';
import { getRegisterDoctorIsLoading } from '../../Model/selectors/getRegisterDoctorIsLoading/getRegisterDoctorIsLoading';
import { registerDoctor } from '../../Model/services/registerDoctor/registerDoctor';
import { getRegisterDoctorPhoto } from '../../Model/selectors/getRegisterDoctorPhoto/getRegisterDoctorPhoto';
import { getRegisterDoctorAddress } from '../../Model/selectors/getRegisterDoctorAddress/getRegisterDoctorAddress';
import { Modal } from '@/Shared/UI/Modal';

const initialReducers: ReducersList = {
    // key : value
    registerDoctor: registerDoctorReducer,
};
export interface RegisterDoctorFormProps {
    className?: string;
}

const RegisterDoctorForm = memo(({ className }: RegisterDoctorFormProps) => {
    const { t } = useTranslation();
    // use dispatch for typing
    const dispatch = useAppDispatch();
    // selectors

    const firstName = useSelector(getRegisterDoctorFirstName);
    const lastName = useSelector(getRegisterDoctorLastName);
    const patronymic = useSelector(getRegisterDoctorPatronymic);
    const dateBirthday = useSelector(getRegisterDoctorDateBirthday);
    const phoneNumber = useSelector(getRegisterDoctorPhoneNumber);
    const password = useSelector(getRegisterDoctorPassword);
    const cabinetNumber = useSelector(getRegisterDoctorCabinetNumber);
    const speciality = useSelector(getRegisterDoctorSpeciality);
    const experience = useSelector(getRegisterDoctorExperience);
    const category = useSelector(getRegisterDoctorCategory);
    const login = useSelector(getRegisterDoctorLogin);
    const isLoading = useSelector(getRegisterDoctorIsLoading);
    const address = useSelector(getRegisterDoctorAddress);
    const photo = useSelector(getRegisterDoctorPhoto);

    // const error = useSelector(getRegisterErr);

    const onChangeFirstName = useCallback(
        (value: string) => {
            dispatch(registerDoctorActions.setDoctorFirstName(value));
        },
        [dispatch],
    );
    const onChangeLastName = useCallback(
        (value: string) => {
            dispatch(registerDoctorActions.setDoctorLastName(value));
        },
        [dispatch],
    );
    const onChangePatronymic = useCallback(
        (value: string) => {
            dispatch(registerDoctorActions.setDoctorPatronymic(value));
        },
        [dispatch],
    );
    const onChangePassword = useCallback(
        (value: string) => {
            dispatch(registerDoctorActions.setDoctorPassword(value));
        },
        [dispatch],
    );
    const onChangePhoneNumber = useCallback(
        (value: string) => {
            dispatch(registerDoctorActions.setDoctorPhoneNumber(value));
        },
        [dispatch],
    );
    const onChangeCabinetNumber = useCallback(
        (value: string) => {
            dispatch(registerDoctorActions.setDoctorCabinetNumber(value));
        },
        [dispatch],
    );
    const onChangeDateBirthDay = useCallback(
        (value: string) => {
            dispatch(registerDoctorActions.setDoctorDateBirthDay(value));
        },
        [dispatch],
    );
    const onChangeSpeciality = useCallback(
        (value: string) => {
            dispatch(registerDoctorActions.setDoctorSpeciality(value));
        },
        [dispatch],
    );
    const onChangeExperience = useCallback(
        (value: string) => {
            dispatch(registerDoctorActions.setDoctorExperience(value));
        },
        [dispatch],
    );
    const onChangeCategory = useCallback(
        (category: DoctorCategory) => {
            dispatch(registerDoctorActions.setDoctorCategory(category));
        },
        [dispatch],
    );
    const onChangeLogin = useCallback(
        (login: string) => {
            dispatch(registerDoctorActions.setDoctorLogin(login));
        },
        [dispatch],
    );
    const onChangeAddress = useCallback(
        (value: string) => {
            dispatch(registerDoctorActions.setDoctorAddress(value));
        },
        [dispatch],
    );
    const [isCreated, setIsCreated] = useState(false);
    const [isFailure, setIsFailure] = useState(false);
    const onClear = useCallback(() => {
        dispatch(registerDoctorActions.setDoctorAddress(''));
        dispatch(registerDoctorActions.setDoctorLogin(''));
        dispatch(registerDoctorActions.setDoctorExperience(''));
        dispatch(registerDoctorActions.setDoctorSpeciality(''));
        dispatch(registerDoctorActions.setDoctorDateBirthDay(''));
        dispatch(registerDoctorActions.setDoctorCabinetNumber(''));
        dispatch(registerDoctorActions.setDoctorPhoneNumber(''));
        dispatch(registerDoctorActions.setDoctorPassword(''));
        dispatch(registerDoctorActions.setDoctorPatronymic(''));
        dispatch(registerDoctorActions.setDoctorFirstName(''));
        dispatch(registerDoctorActions.setDoctorLastName(''));
        // @ts-ignore
        document.getElementById('doctorDateBirthDay').value = '';
        // @ts-ignore
        document.getElementById('doctorDateBirthDay').type = 'text';
        // @ts-ignore
        document.getElementById('doctorExperience').value = '';
    }, [dispatch]);
    const onClose = useCallback(() => {
        setIsCreated(false);
        setIsFailure(false);
        onClear();
    }, [onClear]);

    const onRegisterClick = useCallback(async () => {
        const result = await dispatch(
            registerDoctor({
                lastName,
                firstName,
                patronymic,
                dateBirthday,
                phoneNumber,
                cabinetNumber,
                speciality,
                experience,
                login,
                password,
            }),
        );
        if (result.meta.requestStatus === 'fulfilled') {
            setIsCreated(true);

            setTimeout(() => {
                onClose();
            }, 2000);
            return;
        }
        setIsFailure(true);
    }, [
        cabinetNumber,
        dateBirthday,
        dispatch,
        experience,
        firstName,
        lastName,
        login,
        onClose,
        password,
        patronymic,
        phoneNumber,
        speciality,
    ]);
    const handleFocus = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.target.type = 'date';
    };
    const handlePhoneInputFocus = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        if (event.target.value.length === 0) {
            event.target.value = '+375';
        }
    };

    const handleBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.value) {
            event.target.type = 'text';
        }
    };

    const handleInputExperienceFocus = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        event.target.type = 'number';
    };

    const handleInputExperienceBlur = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        if (!event.target.value) {
            event.target.type = 'text';
        }
    };
    return (
        <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
            <Modal
                className={classNames('', {}, [className])}
                isOpen={isCreated}
                onClose={onClose}
                lazy
            >
                <Text variant={'accent'} title="Врач зарегистрирован" />
            </Modal>
            <Modal
                className={classNames('', {}, [className])}
                isOpen={isFailure}
                onClose={onClose}
                lazy
            >
                <VStack gap={'8'} max align="center">
                    <Text
                        variant={'error'}
                        title="Не удалось зарегистрировать врача"
                    />
                    <Text variant={'error'} title="Повторите регистрацию" />
                </VStack>
            </Modal>

            <HStack gap={'32'} wrap="wrap">
                <VStack
                    align="center"
                    gap={'8'}
                    className={classNames(cls.LoginForm, {}, [className])}
                    max
                >
                    <Text title={t('Форма регистрации врача')} />
                    {/* {error && <Text text={t(error)} variant={"error"} />} */}
                    <Input
                        autoFocus
                        type="text"
                        className={cls.input}
                        placeholder={t('Введите фамилию')}
                        onChange={onChangeLastName}
                        value={lastName}
                    />
                    <Input
                        type="text"
                        autoComplete="new-password"
                        className={cls.input}
                        placeholder={t('Введите имя')}
                        onChange={onChangeFirstName}
                        value={firstName}
                    />
                    <Input
                        type="text"
                        className={cls.input}
                        placeholder={t('Введите отчество')}
                        onChange={onChangePatronymic}
                        value={patronymic}
                    />
                    <Input
                        type={'text'}
                        className={cls.input}
                        id={'doctorDateBirthDay'}
                        placeholder={t('Выберите дату рождения')}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChange={onChangeDateBirthDay}
                        value={dateBirthday}
                    />

                    <Input
                        type="tel"
                        // eslint-disable-next-line max-len
                        pattern="\s{0,}\+{1,1}375\s{0,}\({0,1}(([2]{1}([5]{1}|[9]{1}))|([3]{1}[3]{1})|([4]{1}[4]{1}))\)\s{0,}[0-9]{3,3}\s{0,}[0-9]{4,4}"
                        className={cls.input}
                        placeholder={t('Введите номер телефона')}
                        onFocus={handlePhoneInputFocus}
                        onChange={onChangePhoneNumber}
                        value={phoneNumber}
                    />
                    <Input
                        type="text"
                        className={cls.input}
                        placeholder={t('Введите адрес')}
                        onChange={onChangeAddress}
                        value={address}
                    />
                    <Input
                        type="text"
                        className={cls.input}
                        placeholder={t('Введите номер кабинета')}
                        onChange={onChangeCabinetNumber}
                        value={cabinetNumber}
                    />

                    <Input
                        type="text"
                        className={cls.input}
                        placeholder={t('Выберите специальность')}
                        onChange={onChangeSpeciality}
                        value={speciality}
                    />
                    <Input
                        type="text"
                        onFocus={handleInputExperienceFocus}
                        onBlur={handleInputExperienceBlur}
                        id={'doctorExperience'}
                        className={cls.input}
                        placeholder={t('Введите опыт')}
                        onChange={onChangeExperience}
                        value={experience}
                    />
                    <Input
                        type="password"
                        autoComplete="new-password"
                        className={cls.input}
                        placeholder={t('Введите логин')}
                        onChange={onChangeLogin}
                        value={login}
                    />
                    <Input
                        type="password"
                        autoComplete="new-password"
                        className={cls.input}
                        placeholder={t('Введите пароль')}
                        onChange={onChangePassword}
                        value={password}
                    />
                    <DoctorCategorySelect
                        value={category}
                        onChange={onChangeCategory}
                    />

                    <Button
                        onClick={onRegisterClick}
                        className={cls.loginBtn}
                        type="submit"
                        disabled={isLoading}
                    >
                        {t('Регистрация')}
                    </Button>
                </VStack>
            </HStack>
        </DynamicModuleLoader>
    );
});
export default RegisterDoctorForm;
