import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { CountAppointmentsSchema } from '../types/appointment';
import { fetchCountAppointments } from '../services/fetchCountAppointments';

const initialState: CountAppointmentsSchema = {
    count: undefined,
    error: '',
    isLoading: false,
};

export const appointmentsCountSlice = createSlice({
    name: 'appointmentsCountSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(fetchCountAppointments.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                fetchCountAppointments.fulfilled,
                (state, action: PayloadAction<number>) => {
                    state.isLoading = false;
                    state.count = action.payload;
                },
            )
            .addCase(fetchCountAppointments.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

// Action creators are generated for each case reducer function
export const { actions: appointmentsCountActions } = appointmentsCountSlice;
export const { reducer: appointmentsCountReducer } = appointmentsCountSlice;
