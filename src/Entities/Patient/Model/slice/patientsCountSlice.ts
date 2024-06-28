import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { fetchCountPatients } from '../services/fetchCountPatients';
import { CountPatientsSchema } from '../types/patient';

const initialState: CountPatientsSchema = {
    count: undefined,
    error: '',
    isLoading: false,
};

export const patientsCountSlice = createSlice({
    name: 'patientCountSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(fetchCountPatients.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                fetchCountPatients.fulfilled,
                (state, action: PayloadAction<number>) => {
                    state.isLoading = false;
                    state.count = action.payload;
                },
            )
            .addCase(fetchCountPatients.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

// Action creators are generated for each case reducer function
export const { actions: patientsCountActions } = patientsCountSlice;
export const { reducer: patientsCountReducer } = patientsCountSlice;
