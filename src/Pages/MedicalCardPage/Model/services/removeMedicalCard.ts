import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/App/Providers/StoreProvider';

export const removeMedicalCard = createAsyncThunk<
    void,
    string,
    ThunkConfig<string>
>('medicalCardPage/removeMedicalCard', async (id, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;
    try {
        const response = await extra.api.delete<void>(
            `http://localhost:5079/MedicalCards`,
            {
                data: {
                    id,
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            },
        );
        if (!response.status) {
            throw new Error();
        }
        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});
