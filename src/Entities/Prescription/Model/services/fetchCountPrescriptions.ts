import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/App/Providers/StoreProvider';

export const fetchCountPrescriptions = createAsyncThunk<
    number,
    void,
    ThunkConfig<string>
>('prescription/fetchCountPrescriptions', async (_, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.get<number>(
            `http://localhost:5079/Prescription/totalCount`,
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
