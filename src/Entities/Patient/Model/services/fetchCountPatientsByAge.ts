import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/App/Providers/StoreProvider';

import { CountPatientsByAgeSchema } from '../types/patient';

export const fetchCountPatientsByAge = createAsyncThunk<
    CountPatientsByAgeSchema,
    void,
    ThunkConfig<string>
>('patient/fetchCountPatientsByAge', async (_, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.get<CountPatientsByAgeSchema>(
            `http://localhost:5015/Patients/countByAge`,
        );

        // const statusCode = response.status;
        // if (statusCode === 403) {
        //     return rejectWithValue('Forbidden');
        // }
        if (!response.data) {
            throw new Error();
        }
        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});
