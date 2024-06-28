import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CreateReviewSchema } from '../types/reviewsPageSchema';
import { createReview } from '../services/createReview';
import { Review } from '@/Entities/Review';

const initialState: CreateReviewSchema = {
    isLoading: false,
    error: undefined,
    description: undefined,
};

const createReviewSlice = createSlice({
    name: 'createReviewSlice',
    initialState,
    reducers: {
        setReviewDescription: (state, action: PayloadAction<string>) => {
            state.description = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createReview.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                createReview.fulfilled,
                (state, action: PayloadAction<Review>) => {
                    state.isLoading = false;
                    // @ts-ignore
                    state.data = action.payload;
                },
            )
            .addCase(createReview.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { reducer: createReviewReducer } = createReviewSlice;
export const { actions: createReviewActions } = createReviewSlice;
