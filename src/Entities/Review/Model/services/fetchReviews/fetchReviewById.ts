
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/App/Providers/StoreProvider';
import { Review } from '../../types/review';

export const fetchReviewById = createAsyncThunk<
    Review,
    string | undefined,
    ThunkConfig<string>
>('reviewDetails/fetchReviewById', async (reviewId, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        if (!reviewId) {
            throw new Error('');
        }
       
        const response = await extra.api.get<Review>(
            `https://localhost:7145/Reviews/${reviewId}`);
        if (!response.data) {
            throw new Error();
        }
        return response.data;
    } catch (e) {
        
        return rejectWithValue('error');
    }
});
