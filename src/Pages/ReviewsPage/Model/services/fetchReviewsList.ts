import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/App/Providers/StoreProvider';
import { Review } from '@/Entities/Review';
import { getUserAuthData } from '@/Entities/ApplicationUser';
import { $apiReviews } from '@/Shared/API/api';

export const fetchAllReviewsList = createAsyncThunk<
    Review[],
    void,
    ThunkConfig<string>
>('reviewsPage/fetchAllReviewsList', async (props, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;

    try {
        const response = await $apiReviews.get<Review[]>(``);
        if (!response.data) {
            throw new Error();
        }

        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});
export const fetchReviewsList = createAsyncThunk<
    Review[],
    void,
    ThunkConfig<string>
>('reviewsPage/fetchReviewsList', async (props, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;
    const patientId = getUserAuthData(getState())?.applicationUserId;
    try {
        const response = await $apiReviews.get<Review[]>(``, {
            params: {
                patientId,
            },
        });
        if (!response.data) {
            throw new Error();
        }
        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});
