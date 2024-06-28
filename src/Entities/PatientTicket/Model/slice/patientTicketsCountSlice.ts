import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { CountPatientTicketsSchema } from '../types/patientTicket';
import { fetchCountPatientTickets } from '../services/fetchCountPatientTickets';

const initialState: CountPatientTicketsSchema = {
    count: undefined,
    error: '',
    isLoading: false,
};

export const patientTicketsCountSlice = createSlice({
    name: 'patientTicketsCountSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(fetchCountPatientTickets.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                fetchCountPatientTickets.fulfilled,
                (state, action: PayloadAction<number>) => {
                    state.isLoading = false;
                    state.count = action.payload;
                },
            )
            .addCase(fetchCountPatientTickets.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

// Action creators are generated for each case reducer function
export const { actions: patientTicketsCountActions } = patientTicketsCountSlice;
export const { reducer: patientTicketsCountReducer } = patientTicketsCountSlice;
