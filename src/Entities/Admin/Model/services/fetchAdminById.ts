import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/App/Providers/StoreProvider';
import { Admin } from '../types/admin';

export const fetchAdminById = createAsyncThunk<
    Admin,
    string,
    ThunkConfig<string>
>('profile/fetchAdminData', async (profileId, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        // const response = await extra.api.get<Profile>(`/profile/${profileId}`);

        const response = await extra.api.get<Admin>(
            `https://localhost:7012/Administrators/${profileId}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Access-Control-Allow-Origin': '*',
                },
            },
        );

        const statusCode = response.status;
        if (statusCode === 403) {
            return rejectWithValue('Forbidden');
        }
        if (!response.data) {
            throw new Error();
        }
        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});
