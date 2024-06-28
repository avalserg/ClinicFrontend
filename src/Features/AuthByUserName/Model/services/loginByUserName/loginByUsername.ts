/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/indent */
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import {
    ApplicationUser,
    initAuthData,
    userActions,
} from '@/Entities/ApplicationUser';
import { ThunkConfig } from '@/App/Providers/StoreProvider';
import { AuthResponse } from '../../types/loginSchema';
import { useAppDispatch } from '@/Shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
    REFRESH_TOKEN_LOCALSTORAGE_KEY,
    USER_LOCALSTORAGE_KEY,
} from '@/Shared/const/localStorage';
import { $apiAuthorization } from '@/Shared/API/api';

interface LoginByUsernameProps {
    login: string;
    password: string;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
enum LoginErrors {
    INCORRECT_DATA = 'Количество симолов пароля и логина менее требуемого',
    SERVER_ERROR = 'Ошибка сервера',
    USER_NOT_FOUND = 'Пользователь не найден',
    USER_ACCESS_FORBIDDEN = 'Неправильный логин или пароль',
}
// return User, get LoginByUsernameProps
// ThunkConfig<string> можно и объект возвратить
// function parseJwt (token:string|undefined) {
//    const base64Url = token?.split('.')[0];
//     const base64 = base64Url?.replace(/-/g, '+').replace(/_/g, '/');
//     const jsonPayload = decodeURIComponent(atob(base64 as string).split('').map((c) => {
//         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//     }).join(''));
//     return JSON.parse(jsonPayload);
// };
export const loginByUsername = createAsyncThunk<
    AuthResponse,
    LoginByUsernameProps,
    ThunkConfig<LoginErrors>
>('login/loginByUsername', async (authData, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;
    try {
        // const response = await extra.api.post<User>("/login", authData);
        // eslint-disable-next-line max-len
        const authResponse = await $apiAuthorization
            .post<AuthResponse>(`/CreateJwtToken`, authData)
            .catch((e) => e.response.status);
        if (authResponse === 400) {
            return rejectWithValue(LoginErrors.USER_NOT_FOUND);
        }
        if (authResponse === 404) {
            return rejectWithValue(LoginErrors.USER_NOT_FOUND);
        }
        if (authResponse === 403) {
            return rejectWithValue(LoginErrors.USER_ACCESS_FORBIDDEN);
        }
        localStorage.setItem(
            USER_LOCALSTORAGE_KEY,
            JSON.stringify(authResponse.data.applicationUser.applicationUserId),
        );

        dispatch(userActions.setAuthData(authResponse.data));
        

        return authResponse.data;
    } catch (e) {
        return rejectWithValue(LoginErrors.SERVER_ERROR);
    }
});
