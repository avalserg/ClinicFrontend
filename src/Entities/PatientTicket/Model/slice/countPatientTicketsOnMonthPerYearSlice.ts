import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { fetchCountPatientTicketsOnTimePerDay } from '../services/fetchCountPatientTicketsOnTimePerDay';
import { CountPatientTicketsOnMonthPerYearSchema} from '../types/patientTicket';
import { fetchCountPatientTicketsOnMonthPerYear } from '../services/fetchCountPatientTicketsOnMonthPerYear';

const initialState: CountPatientTicketsOnMonthPerYearSchema = {
    value: undefined,
    error: '',
    isLoading: false,
};

export const countPatientTicketsOnMonthPerYearSlice = createSlice({
    name: 'countPatientTicketsOnMonthPerYear',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(
                fetchCountPatientTicketsOnMonthPerYear.pending,
                (state) => {
                    state.error = undefined;
                    state.isLoading = true;
                },
            )
            .addCase(
                fetchCountPatientTicketsOnMonthPerYear.fulfilled,
                (
                    state,
                    action: PayloadAction<CountPatientTicketsOnMonthPerYearSchema>,
                ) => {
                    state.isLoading = false;

                    state.value = action.payload.value;
                },
            )
            .addCase(
                fetchCountPatientTicketsOnMonthPerYear.rejected,
                (state, action) => {
                    state.isLoading = false;
                    state.error = action.payload;
                },
            );
    },
});

// Action creators are generated for each case reducer function
export const { actions: countPatientTicketsOnMonthPerYearActions } =
    countPatientTicketsOnMonthPerYearSlice;
export const { reducer: countPatientTicketsOnMonthPerYearReducer } =
    countPatientTicketsOnMonthPerYearSlice;
