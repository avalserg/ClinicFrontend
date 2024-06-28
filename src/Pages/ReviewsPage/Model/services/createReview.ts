import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/App/Providers/StoreProvider';
import { Review } from '@/Entities/Review';
import { CreateReviewSchema } from '../types/reviewsPageSchema';
import { ValidateCreateReviewError } from '../consts/consts';
import { getReviewDescription } from '../selectors/reviewsPageSelectors';
import { getUserAuthData } from '@/Entities/ApplicationUser';
import { $apiReviews } from '@/Shared/API/api';

export const createReview = createAsyncThunk<
    Review,
    CreateReviewSchema,
    ThunkConfig<ValidateCreateReviewError[]>
>('reviewsPage/fetchReviewsList', async (props, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;

    const patientId = getUserAuthData(getState())?.applicationUserId;

    const description = getReviewDescription(getState());
    try {
        const response = await $apiReviews.post<CreateReviewSchema>(``, {
            patientId,
            description,
        });
        if (response.status === 400) {
            return rejectWithValue([
                ValidateCreateReviewError.INCORRECT_DESCRIPTION_LENGTH,
            ]);
        }
        if (!response.data) {
            throw new Error();
        }
        return response.data;
    } catch (e) {
        return rejectWithValue([
            ValidateCreateReviewError.INCORRECT_DESCRIPTION_LENGTH,
        ]);
    }
});
