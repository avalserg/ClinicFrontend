import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/App/Providers/StoreProvider';

export const removeDoctor = createAsyncThunk<void, string, ThunkConfig<string>>(
    'reviewsPage/fetchReviewsList',
    async (id, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;
        try {
            const response = await extra.api.delete<void>(
                `http://localhost:5015/Doctors`,
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
    },
);
