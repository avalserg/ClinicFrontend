import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/App/Providers/StoreProvider';

import { getUserAuthData } from '@/Entities/ApplicationUser';
import { Doctor } from '@/Entities/Doctor';
import { $apiManageUsers } from '@/Shared/API/api';

export const fetchDoctorsList = createAsyncThunk<
    Doctor[],
    void,
    ThunkConfig<string>
>('doctorsPage/fetchDoctorsList', async (props, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;
    const patientId = getUserAuthData(getState())?.applicationUserId;
    try {
        const response = await $apiManageUsers.get<Doctor[]>(`/Doctors`);
        if (!response.data) {
            throw new Error();
        }
        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});
