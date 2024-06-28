import axios from 'axios';
import { TOKEN_LOCALSTORAGE_KEY } from '@/Shared/const/localStorage';
import { AuthResponse } from '@/Features/AuthByUserName';
import { ApplicationUser } from '@/Entities/ApplicationUser';

export const $api = axios.create({
    // baseURL: __API__,
});
// на каждый запрос добавляем заголовок
$api.interceptors.request.use((config) => {
    if (config.headers) {
        config.headers.Authorization = `Bearer ${localStorage.getItem(TOKEN_LOCALSTORAGE_KEY) || ''}`;
    }
    return config;
});
const refreshToken = localStorage.getItem('refresh_token');
const userId = localStorage.getItem('user')?.replace(/"/g, '');

$api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const code = error.code;
        if (
            error.code === 'ERR_NETWORK' &&
            error.config &&
            !error.config._isRetry
        ) {
            originalRequest._isRetry = true;

            try {
                const response = await axios.post<AuthResponse>(
                    'http://localhost:5076/Authorization/CreateJwtTokenByRefreshToken',
                    {
                        refreshToken,
                        applicationUserId: userId?.replace(/"/g, ''),
                    },
                );

                // @ts-ignore
                localStorage.setItem('token', response.data.value.jwtToken);
                await axios.get<ApplicationUser>(
                    `http://localhost:5015/Users/CurrentUser`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                            'Access-Control-Allow-Origin': '*',
                        },
                    },
                );
            } catch (e: any) {
                if (e.config.url === 'Auth/Refresh') {
                    throw error;
                }

                throw error;
            }
        }
    },
);

export const $apiPatientTickets = axios.create({
    baseURL: `http://localhost:5289/PatientTickets`,
});
$apiPatientTickets.interceptors.request.use((config) => {
    if (config.headers) {
        config.headers.Authorization = `Bearer ${localStorage.getItem(TOKEN_LOCALSTORAGE_KEY) || ''}`;
    }
    return config;
});
$apiPatientTickets.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const code = error.code;
        if (
            error.code === 'ERR_NETWORK' &&
            error.config &&
            !error.config._isRetry
        ) {
            originalRequest._isRetry = true;

            try {
                const response = await axios.post<AuthResponse>(
                    'http://localhost:5076/Authorization/CreateJwtTokenByRefreshToken',
                    {
                        refreshToken,
                        applicationUserId: userId?.replace(/"/g, ''),
                    },
                );

                // @ts-ignore
                localStorage.setItem('token', response.data.value.jwtToken);
                await axios.get<ApplicationUser>(
                    `http://localhost:5015/Users/CurrentUser`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                            'Access-Control-Allow-Origin': '*',
                        },
                    },
                );
            } catch (e: any) {
                if (e.config.url === 'Auth/Refresh') {
                    throw error;
                }

                throw error;
            }
        }
    },
);
export const $apiMedicalCards = axios.create({
    baseURL: `http://localhost:5079`,
});
$apiMedicalCards.interceptors.request.use((config) => {
    if (config.headers) {
        config.headers.Authorization = `Bearer ${localStorage.getItem(TOKEN_LOCALSTORAGE_KEY) || ''}`;
    }
    return config;
});
$apiMedicalCards.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const code = error.code;
        if (
            error.code === 'ERR_NETWORK' &&
            error.config &&
            !error.config._isRetry
        ) {
            originalRequest._isRetry = true;

            try {
                const response = await axios.post<AuthResponse>(
                    'http://localhost:5076/Authorization/CreateJwtTokenByRefreshToken',
                    {
                        refreshToken,
                        applicationUserId: userId?.replace(/"/g, ''),
                    },
                );

                // @ts-ignore
                localStorage.setItem('token', response.data.value.jwtToken);
                await axios.get<ApplicationUser>(
                    `http://localhost:5015/Users/CurrentUser`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                            'Access-Control-Allow-Origin': '*',
                        },
                    },
                );
            } catch (e: any) {
                if (e.config.url === 'Auth/Refresh') {
                    throw error;
                }

                throw error;
            }
        }
    },
);
export const $apiManageUsers = axios.create({
    baseURL: `http://localhost:5015`,
});
$apiManageUsers.interceptors.request.use((config) => {
    if (config.headers) {
        config.headers.Authorization = `Bearer ${localStorage.getItem(TOKEN_LOCALSTORAGE_KEY) || ''}`;
    }
    return config;
});
$apiManageUsers.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const code = error.code;
        if (
            error.code === 'ERR_NETWORK' &&
            error.config &&
            !error.config._isRetry
        ) {
            originalRequest._isRetry = true;

            try {
                const response = await axios.post<AuthResponse>(
                    'http://localhost:5076/Authorization/CreateJwtTokenByRefreshToken',
                    {
                        refreshToken,
                        applicationUserId: userId?.replace(/"/g, ''),
                    },
                );

                // @ts-ignore
                localStorage.setItem('token', response.data.value.jwtToken);
                await axios.get<ApplicationUser>(
                    `http://localhost:5015/Users/CurrentUser`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                            'Access-Control-Allow-Origin': '*',
                        },
                    },
                );
            } catch (e: any) {
                if (e.config.url === 'Auth/Refresh') {
                    throw error;
                }

                throw error;
            }
        }
    },
);
export const $apiReviews = axios.create({
    baseURL: `http://localhost:5270/api/v1/Reviews`,
});
$apiReviews.interceptors.request.use((config) => {
    if (config.headers) {
        config.headers.Authorization = `Bearer ${localStorage.getItem(TOKEN_LOCALSTORAGE_KEY) || ''}`;
    }
    return config;
});
$apiReviews.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const code = error.code;
        if (
            error.code === 'ERR_NETWORK' &&
            error.config &&
            !error.config._isRetry
        ) {
            originalRequest._isRetry = true;

            try {
                const response = await axios.post<AuthResponse>(
                    'http://localhost:5076/Authorization/CreateJwtTokenByRefreshToken',
                    {
                        refreshToken,
                        applicationUserId: userId?.replace(/"/g, ''),
                    },
                );

                // @ts-ignore
                localStorage.setItem('token', response.data.value.jwtToken);
                await axios.get<ApplicationUser>(
                    `http://localhost:5015/Users/CurrentUser`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                            'Access-Control-Allow-Origin': '*',
                        },
                    },
                );
            } catch (e: any) {
                if (e.config.url === 'Auth/Refresh') {
                    throw error;
                }

                throw error;
            }
        }
    },
);
export const $apiAuthorization = axios.create({
    baseURL: `http://localhost:5076/Authorization`,
});
$apiAuthorization.interceptors.request.use((config) => {
    if (config.headers) {
        config.headers.Authorization = `Bearer ${localStorage.getItem(TOKEN_LOCALSTORAGE_KEY) || ''}`;
    }
    return config;
});
