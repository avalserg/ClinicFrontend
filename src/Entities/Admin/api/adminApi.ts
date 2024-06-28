import { Patient } from '@/Entities/Patient';
import { rtkApi } from '@/Shared/API/rtkApi';

interface SetJsonSettings {
    userId: string;
}
export const getTokenFromLocalStorage = (): string | null => {
    const token = localStorage.getItem('token');
    return token;
};

const userApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getUserDataById: build.query<Patient, string>({
            query: (userId) => ({
                url: `https://localhost:7223/Users/CurrentUser`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${getTokenFromLocalStorage}`,
                },
            }),
        }),
    }),
});
// rtk without hook without use in the beginning name

export const getUserDataByIdQuery = userApi.endpoints.getUserDataById.initiate;
