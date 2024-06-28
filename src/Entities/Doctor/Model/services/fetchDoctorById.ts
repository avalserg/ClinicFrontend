import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/App/Providers/StoreProvider';
import { USER_LOCALSTORAGE_KEY } from 'localStorage';
import { Doctor } from '../types/doctor';
import { $api } from '@/Shared/API/api';

export const fetchDoctorById = createAsyncThunk<
    Doctor,
    string,
    ThunkConfig<string>
>('profile/fetchDoctorDataById', async (profileId, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        // const response = await extra.api.get<Profile>(`/profile/${profileId}`);

        const response = await extra.api.get<Doctor>(
            `https://localhost:7012/Doctors/${profileId}`,
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
