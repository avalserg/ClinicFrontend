import { useTranslation } from 'react-i18next';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useForceUpdate } from '@react-spring/shared';
import { classNames } from '@/Shared/lib/classNames/classNames';
import cls from './RegisterPatientForm.module.scss';

import DynamicModuleLoader, {
    ReducersList,
} from '@/Shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/Shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Input } from '@/Shared/UI/Input';
import { Button } from '@/Shared/UI/Button';
import { Text } from '@/Shared/UI/Text';
import { HStack, VStack } from '@/Shared/UI/Stack';
import PickerWithAutocompleteField from './Picker';
import { getRegisterPatientLogin } from '../../Model/selectors/getRegisterPatientLogin/getRegisterPatientLogin';
import { getRegisterPatientPassword } from '../../Model/selectors/getRegisterPatientPassword/getRegisterPatientPassword';
import { getRegisterPatientFirstName } from '../../Model/selectors/getRegisterPatientFirstName/getRegisterPatientFirstName';
import { getRegisterPatientLastName } from '../../Model/selectors/getRegisterPatientLastName/getRegisterPatientLastName';
import { getRegisterPatientPatronymic } from '../../Model/selectors/getRegisterPatientPatronymic/getRegisterPatientPatronymic';
import { getRegisterPatientPhoneNumber } from '../../Model/selectors/getRegisterPatientPhoneNumber/getRegisterPatientPhoneNumber';
import { getRegisterPatientAddress } from '../../Model/selectors/getRegisterPatientAddress/getRegisterPatientAddress';
import { getRegisterPatientError } from '../../Model/selectors/getRegisterPatientError/getRegisterPatientError';
import { getRegisterPatientIsLoading } from '../../Model/selectors/getRegisterPatientIsLoading/getRegisterPatientIsLoading';
import { getRegisterPatientDateBirthday } from '../../Model/selectors/getRegisterPatientDateBirthday/getRegisterPatientDateBirthday';
import { getRegisterPatientPassport } from '../../Model/selectors/getRegisterPatientPassport/getRegisterPatientPassport';
import {
    registerPatientActions,
    registerPatientReducer,
} from '../../Model/slice/registerPatientSlice';
import { createPatient } from '../../Model/services/createPatient/createPatient';
import { loginReducer } from '@/Features/AuthByUserName';
import { loginByUsername } from '@/Features/AuthByUserName/Model/services/loginByUserName/loginByUsername';
import { getLoginUsername } from '@/Features/AuthByUserName/Model/selectors/getLoginUsername/getLoginUsername';
import { getLoginPassword } from '@/Features/AuthByUserName/Model/selectors/getLoginPassword/getLoginPassword';
import { useNavigate } from 'react-router-dom';
import { getRegisterPatientValidateErrors } from '../../Model/selectors/getRegisterPatientValidateErrors/getRegisterPatientValidateErrors';
import { ValidateCreatePatientError } from '../../Model/consts/consts';

export interface RegisterPatientFormProps {
    className?: string;
    // вызывается в случае успешной авторизации
    onSuccess?: () => void;
}
const initialReducers: ReducersList = {
    // key : value
    registerPatientSchema: registerPatientReducer,
};
const RegisterPatientForm = memo(
    ({ className, onSuccess }: RegisterPatientFormProps) => {
        const { t } = useTranslation();
        // use dispatch for typing
        const dispatch = useAppDispatch();
        const navigate = useNavigate();
        // selectors
        const login = useSelector(getRegisterPatientLogin);
        const password = useSelector(getRegisterPatientPassword);
        const FirstName = useSelector(getRegisterPatientFirstName);
        const LastName = useSelector(getRegisterPatientLastName);
        const Patronymic = useSelector(getRegisterPatientPatronymic);
        const PhoneNumber = useSelector(getRegisterPatientPhoneNumber);
        const Address = useSelector(getRegisterPatientAddress);
        const Error = useSelector(getRegisterPatientValidateErrors);
        const IsLoading = useSelector(getRegisterPatientIsLoading);
        const DateBirthDay = useSelector(getRegisterPatientDateBirthday);
        const Passport = useSelector(getRegisterPatientPassport);
        const err = useSelector(getRegisterPatientError);
        const validateErrorTranslates = {
            [ValidateCreatePatientError.SERVER_ERROR]: t('Ошибка сервера'),
            [ValidateCreatePatientError.INCORRECT_ADDRESS]:
                t('Некорректный адрес'),
            [ValidateCreatePatientError.INCORRECT_FIRST_NAME]:
                t('Имя  обязательно'),
            [ValidateCreatePatientError.INCORRECT_LAST_NAME]: t(
                'Фамилия обязательна',
            ),
            [ValidateCreatePatientError.INCORRECT_PATRONYMIC]: t(
                'Отчество обязательно',
            ),
            [ValidateCreatePatientError.INCORRECT_DATE_BIRTHDAY]: t(
                'Некорректная дата рождения',
            ),
            [ValidateCreatePatientError.INCORRECT_PASSWORD]: t(
                'Некорректный пароль',
            ),
            [ValidateCreatePatientError.INCORRECT_PASSPORT]: t(
                'Некорректный формат номера паспорта',
            ),
            [ValidateCreatePatientError.INCORRECT_PHONE_NUMBER]: t(
                'Некорректный формат номера телефона',
            ),
            [ValidateCreatePatientError.INCORRECT_LOGIN]:
                t('Некорректный логин'),
            [ValidateCreatePatientError.NO_DATA]: t('Данные не указаны'),
        };

        const onChangeFirstName = useCallback(
            (value?: string) => {
                dispatch(
                    registerPatientActions.setPatientFirstName(value || ''),
                );
            },
            [dispatch],
        );
        const onChangeLastName = useCallback(
            (lastName?: string) => {
                const f = dispatch(
                    registerPatientActions.setPatientLastName(lastName || ''),
                );
            },
            [dispatch],
        );
        const onChangePatronymic = useCallback(
            (patronymic?: string) => {
                const f = dispatch(
                    registerPatientActions.setPatientPatronymic(
                        patronymic || '',
                    ),
                );
            },
            [dispatch],
        );

        const onChangeAddress = useCallback(
            (address?: string) => {
                dispatch(
                    registerPatientActions.setPatientAddress(address || ''),
                );
            },
            [dispatch],
        );
        const onChangePhoneNumber = useCallback(
            (phoneNumber?: string) => {
                dispatch(
                    registerPatientActions.setPatientPhoneNumber(
                        phoneNumber || '',
                    ),
                );
            },
            [dispatch],
        );
        const onChangePassport = useCallback(
            (value?: string) => {
                dispatch(
                    registerPatientActions.setPatientPassport(value || ''),
                );
            },
            [dispatch],
        );
        const onChangeDateBirthday = useCallback(
            (value?: string) => {
                dispatch(
                    registerPatientActions.setPatientDateBirthDay(value || ''),
                );
            },
            [dispatch],
        );

        const onChangeLogin = useCallback(
            (value?: string) => {
                dispatch(registerPatientActions.setPatientLogin(value || ''));
            },
            [dispatch],
        );
        const onChangePassword = useCallback(
            (value?: string) => {
                dispatch(
                    registerPatientActions.setPatientPassword(value || ''),
                );
            },
            [dispatch],
        );

        const onRegisterClick = useCallback(async () => {
            const result = await dispatch(createPatient());
            if (result.meta.requestStatus === 'fulfilled') {
                const resultLogin = await dispatch(
                    loginByUsername({ login, password }),
                );
                if (resultLogin.meta.requestStatus === 'fulfilled') {
                    navigate('/');
                }
            }
        }, [dispatch, navigate, login, password]);

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
       
        const onClearForm = useCallback(async () => {
            dispatch(registerPatientActions.setPatientPassword(''));
            dispatch(registerPatientActions.setPatientFirstName(''));
            dispatch(registerPatientActions.setPatientLastName(''));
            dispatch(registerPatientActions.setPatientPassport(''));
            dispatch(registerPatientActions.setPatientPatronymic(''));
            dispatch(registerPatientActions.setPatientDateBirthDay(''));
            dispatch(registerPatientActions.setPatientLogin(''));
            dispatch(registerPatientActions.setPatientPhoneNumber(''));
            dispatch(registerPatientActions.setPatientAddress(''));
            // @ts-ignore
            const d = (document.getElementById('patientDateBirthDay').value =
                '');
        }, [dispatch]);
        return (
            <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
                <VStack
                    align="center"
                    gap={'8'}
                    className={classNames(cls.LoginForm, {}, [className])}
                    max
                >
                    <Text title={t('Форма регистрации')} />
                    {Error?.length &&
                        Error.map((err) => (
                            <Text
                                key={err}
                                // @ts-ignore
                                text={validateErrorTranslates[err]}
                                variant={'error'}
                            />
                        ))}
                    {err && (
                        <Text
                            key={err}
                            // @ts-ignore
                            text={err}
                            variant={'error'}
                        />
                    )}
                    <Input
                        autoFocus
                        type="text"
                        className={cls.input}
                        placeholder={t('Введите фамилию (более 2 символов)')}
                        onChange={onChangeLastName}
                        value={LastName}
                    />
                    <Input
                        type="text"
                        // autoComplete="new-password"
                        className={cls.input}
                        placeholder={t('Введите имя (более 2 символов)')}
                        onChange={onChangeFirstName}
                        value={FirstName}
                    />
                    <Input
                        type="text"
                        className={cls.input}
                        placeholder={t('Введите отчество (более 2 символов)')}
                        onChange={onChangePatronymic}
                        value={Patronymic}
                    />
                    <Input
                        type={'text'}
                        id={'patientDateBirthDay'}
                        className={cls.input}
                        placeholder={t('Выберите дату рождения')}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChange={onChangeDateBirthday}
                        value={DateBirthDay}
                    />
                    {/* {PickerWithAutocompleteField()} */}
                    <Input
                        type="tel"
                        // eslint-disable-next-line max-len
                        pattern="\s{0,}\+{1,1}375\s{0,}\({0,1}(([2]{1}([5]{1}|[9]{1}))|([3]{1}[3]{1})|([4]{1}[4]{1}))\)\s{0,}[0-9]{3,3}\s{0,}[0-9]{4,4}"
                        className={cls.input}
                        onFocus={handlePhoneInputFocus}
                        placeholder={t('Введите номер телефона +375000000000')}
                        onChange={onChangePhoneNumber}
                        value={PhoneNumber}
                    />
                    <Input
                        type="text"
                        // autoComplete="new-password"
                        className={cls.input}
                        placeholder={t(
                            'Введите домашний адрес (более 5 символов)',
                        )}
                        onChange={onChangeAddress}
                        value={Address}
                    />
                    <Input
                        type="text"
                        // autoComplete="new-password"
                        className={cls.input}
                        placeholder={t('Введите номер паспорта XX0000000')}
                        onChange={onChangePassport}
                        value={Passport}
                    />
                    <Input
                        type="text"
                        className={cls.input}
                        placeholder={t('Введите логин (более 8 символов)')}
                        onChange={onChangeLogin}
                        value={login}
                    />
                    <Input
                        type="password"
                        autoComplete="new-password"
                        className={cls.input}
                        placeholder={t('Введите пароль (более 8 символов)')}
                        onChange={onChangePassword}
                        value={password}
                    />
                    <HStack gap={'8'}>
                        <Button
                            onClick={onRegisterClick}
                            className={cls.loginBtn}
                            type="submit"
                            disabled={IsLoading}
                        >
                            {t('Регистрация')}
                        </Button>
                        <Button
                            onClick={onClearForm}
                            className={cls.loginBtn}
                            color={'update'}
                            type="submit"
                            disabled={IsLoading}
                        >
                            {t('Очистить форму')}
                        </Button>
                    </HStack>
                </VStack>
            </DynamicModuleLoader>
        );
    },
);
export default RegisterPatientForm;
