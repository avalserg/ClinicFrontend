import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/App/Providers/StoreProvider';
import { USER_LOCALSTORAGE_KEY } from 'localStorage';
import { Patient } from '../types/patient';

export const fetchPatientById = createAsyncThunk<
    Patient,
    string,
    ThunkConfig<string>
>('profile/fetchUserData', async (profileId, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        // const response = await extra.api.get<Profile>(`/profile/${profileId}`);

        const response = await extra.api.get<Patient>(
            `https://localhost:7012/Patients/${profileId}`,
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
