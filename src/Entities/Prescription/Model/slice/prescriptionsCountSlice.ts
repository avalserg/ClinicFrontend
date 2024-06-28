import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { CountPrescriptionsSchema } from '../types/prescription';
import { fetchCountPrescriptions } from '../services/fetchCountPrescriptions';

const initialState: CountPrescriptionsSchema = {
    count: undefined,
    error: '',
    isLoading: false,
};

export const prescriptionsCountSlice = createSlice({
    name: 'appointmentsCountSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(fetchCountPrescriptions.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                fetchCountPrescriptions.fulfilled,
                (state, action: PayloadAction<number>) => {
                    state.isLoading = false;
                    state.count = action.payload;
                },
            )
            .addCase(fetchCountPrescriptions.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

// Action creators are generated for each case reducer function
export const { actions: prescriptionsCountActions } = prescriptionsCountSlice;
export const { reducer: prescriptionsCountReducer } = prescriptionsCountSlice;
