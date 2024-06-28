import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useForceUpdate } from '@react-spring/shared';
import { classNames } from '@/Shared/lib/classNames/classNames';
import cls from './LoginForm.module.scss';

import { loginActions, loginReducer } from '../../Model/slice/loginSlice';
import { loginByUsername } from '../../Model/services/loginByUserName/loginByUsername';

import { getLoginUsername } from '../../Model/selectors/getLoginUsername/getLoginUsername';
import { getLoginPassword } from '../../Model/selectors/getLoginPassword/getLoginPassword';
import { getLoginError } from '../../Model/selectors/getLoginError/getLoginError';
import { getLoginIsLoading } from '../../Model/selectors/getLoginIsLoading/getLoginIsLoading';
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
import { initAuthData } from '@/Entities/ApplicationUser';
import { Navigate, useNavigate } from 'react-router-dom';

export interface LoginFormProps {
    className?: string;
    // вызывается в случае успешной авторизации
    onSuccess: () => void;
}
const initialReducers: ReducersList = {
    // key : value
    loginForm: loginReducer,
};
const LoginForm = memo(({ className, onSuccess }: LoginFormProps) => {
    const { t } = useTranslation();

    const dispatch = useAppDispatch();
    // selectors
    const login = useSelector(getLoginUsername);
    const password = useSelector(getLoginPassword);
    const error = useSelector(getLoginError);
    const isLoading = useSelector(getLoginIsLoading);

    const forceUpdate = useForceUpdate();

    // useCallback не меняет ссылку
    const onChangeUsername = useCallback(
        (value: string) => {
            dispatch(loginActions.setUserName(value));
        },
        [dispatch],
    );
    const onChangePassword = useCallback(
        (value: string) => {
            dispatch(loginActions.setPassword(value));
        },
        [dispatch],
    );
    const homePage = useNavigate();
    const onLoginClick = useCallback(async () => {
        const result = await dispatch(loginByUsername({ login, password }));
        if (result.meta.requestStatus === 'fulfilled') {
            onSuccess();
            forceUpdate();
            homePage('/');
        }
    }, [dispatch, login, password, onSuccess, forceUpdate, homePage]);

    return (
        <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
            <VStack
                gap={'16'}
                align="center"
                className={classNames(cls.LoginForm, {}, [className])}
            >
                <Text title={t('Форма авторизации')} />
                {error && (
                    <Text text={t(error)} variant={'error'} align="center" />
                )}
                <HStack gap={'8'} max>
                    <Icon Svg={LoginIcon} height={'30'} />
                    <Input
                        autoFocus
                        type="text"
                        className={cls.input}
                        placeholder={t('Введите логин не менее 3 символов')}
                        onChange={onChangeUsername}
                        value={login}
                    />
                </HStack>
                <HStack gap={'8'} max>
                    <Icon Svg={PasswordIcon} height={'30'} />
                    <Input
                        type="password"
                        autoComplete="new-password"
                        className={cls.input}
                        placeholder={t('Введите пароль не менее 8 символов')}
                        onChange={onChangePassword}
                        value={password}
                    />
                </HStack>
                <Button
                    onClick={onLoginClick}
                    className={cls.loginBtn}
                    disabled={
                        isLoading || login.length < 3 || password.length < 8
                    }
                >
                    {t('Войти')}
                </Button>
            </VStack>
        </DynamicModuleLoader>
    );
});
export default LoginForm;
