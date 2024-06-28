import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { CountPatientsByAgeSchema } from '../types/patient';
import { fetchCountPatientsByAge } from '../services/fetchCountPatientsByAge';

const initialState: CountPatientsByAgeSchema = {
    value: undefined,
    error: '',
    isLoading: false,
};

export const coutnPatientsByAgeSlice = createSlice({
    name: 'coutnPatientsByAge',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(fetchCountPatientsByAge.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                fetchCountPatientsByAge.fulfilled,
                (state, action: PayloadAction<CountPatientsByAgeSchema>) => {
                    state.isLoading = false;

                    state.value = action.payload.value;
                },
            )
            .addCase(fetchCountPatientsByAge.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

// Action creators are generated for each case reducer function
export const { actions: countPatientsByAgeActions } = coutnPatientsByAgeSlice;
export const { reducer: countPatientsByAgeReducer } = coutnPatientsByAgeSlice;
