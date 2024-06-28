import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ReviewsPageSchema } from '../types/reviewsPageSchema';
import { Review } from '@/Entities/Review';
import {
    fetchAllReviewsList,
    fetchReviewsList,
} from '../services/fetchReviewsList';

const initialState: ReviewsPageSchema = {
    isLoading: false,
    error: undefined,
    data: undefined,
};

const reviewsPageSlice = createSlice({
    name: 'reviewsPageSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllReviewsList.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                fetchAllReviewsList.fulfilled,
                (state, action: PayloadAction<Review[]>) => {
                    state.isLoading = false;
                    // @ts-ignore
                    state.data = action.payload;
                },
            )
            .addCase(fetchAllReviewsList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(fetchReviewsList.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                fetchReviewsList.fulfilled,
                (state, action: PayloadAction<Review[]>) => {
                    state.isLoading = false;
                    // @ts-ignore
                    state.data = action.payload;
                },
            )
            .addCase(fetchReviewsList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { reducer: reviewsPageReducer } = reviewsPageSlice;
export const { actions: reviewsPageActions } = reviewsPageSlice;
