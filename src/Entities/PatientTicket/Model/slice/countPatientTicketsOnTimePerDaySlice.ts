import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { fetchCountPatientTicketsOnTimePerDay } from '../services/fetchCountPatientTicketsOnTimePerDay';
import { CountPatientTicketsOnTimePerDaySchema } from '../types/patientTicket';

const initialState: CountPatientTicketsOnTimePerDaySchema = {
    value: undefined,
    error: '',
    isLoading: false,
};

export const countPatientTicketsOnTimePerDaySlice = createSlice({
    name: 'countPatientTicketsOnTimePerDay',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(fetchCountPatientTicketsOnTimePerDay.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                fetchCountPatientTicketsOnTimePerDay.fulfilled,
                (
                    state,
                    action: PayloadAction<CountPatientTicketsOnTimePerDaySchema>,
                ) => {
                    state.isLoading = false;

                    state.value = action.payload.value;
                },
            )
            .addCase(
                fetchCountPatientTicketsOnTimePerDay.rejected,
                (state, action) => {
                    state.isLoading = false;
                    state.error = action.payload;
                },
            );
    },
});

// Action creators are generated for each case reducer function
export const { actions: countPatientTicketsOnTimePerDayActions } =
    countPatientTicketsOnTimePerDaySlice;
export const { reducer: countPatientTicketsOnTimePerDayReducer } =
    countPatientTicketsOnTimePerDaySlice;
