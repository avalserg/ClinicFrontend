import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/App/Providers/StoreProvider';
import { CountDoctorsByCategorySchema } from '../types/doctor';

export const fetchCountDoctorsByCategory = createAsyncThunk<
    CountDoctorsByCategorySchema,
    void,
    ThunkConfig<string>
>('profile/fetchCountDoctorByCategory', async (_, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.get<CountDoctorsByCategorySchema>(
            `http://localhost:5015/Doctors/countByCategories`,
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
