import { ThunkConfig } from '@/App/Providers/StoreProvider';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const logoutUser = createAsyncThunk<void, void, ThunkConfig<string>>(
    'applicationUser/logoutUser',
    async (_, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
            const response = await extra.api.delete<void>(
                `http://localhost:5076/Authorization`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                },
            );
            if (response.status !== 200) {
                throw new Error();
            }
            return response.data;
        } catch (e) {
            return rejectWithValue('');
        }
    },
);
