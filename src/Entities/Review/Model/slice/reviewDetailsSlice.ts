import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchReviewById } from '../services/fetchReviews/fetchReviewById';
import { Review } from '../types/review';
import { ReviewDetailsSchema } from '../types/reviewDetailsSchema';


const initialState: ReviewDetailsSchema = {
    isLoading: false,
    error: undefined,
    data: undefined,
};

export const reviewDetailsSlice = createSlice({
    name: 'reviewDetails',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchReviewById.pending, (state) => {
                state.error = undefined;

                state.isLoading = true;
            })
            .addCase(
                fetchReviewById.fulfilled,
                (state, action: PayloadAction<Review>) => {
                    state.isLoading = false;
                    state.data = action.payload;
                },
            )
            .addCase(fetchReviewById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

// Action creators are generated for each case reducer function
export const { actions: reviewDetailsActions } = reviewDetailsSlice;
export const { reducer: reviewDetailsReducer } = reviewDetailsSlice;
