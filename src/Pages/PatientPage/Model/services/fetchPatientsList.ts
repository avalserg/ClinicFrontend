import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/App/Providers/StoreProvider';

import { getUserAuthData } from '@/Entities/ApplicationUser';

import { $apiManageUsers } from '@/Shared/API/api';
import { Patient } from '@/Entities/Patient';

export const fetchPatientsList = createAsyncThunk<
    Patient[],
    void,
    ThunkConfig<string>
>('patientsPage/fetchPatientsList', async (props, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;
    const patientId = getUserAuthData(getState())?.applicationUserId;
    try {
        const response = await $apiManageUsers.get<Patient[]>(`/Patients`);
        if (!response.data) {
            throw new Error();
        }
        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});
