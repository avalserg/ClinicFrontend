import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { fetchCountDoctors } from '../services/fetchCountDoctors';
import { CountDoctorsSchema } from '../types/doctor';

const initialState: CountDoctorsSchema = {
    countDoctors: undefined,
    error: '',
    isLoading: false,
};

export const countDoctorSlice = createSlice({
    name: 'countDoctor',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(fetchCountDoctors.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                fetchCountDoctors.fulfilled,
                (state, action: PayloadAction<number>) => {
                    state.isLoading = false;
                    state.countDoctors = action.payload;
                },
            )
            .addCase(fetchCountDoctors.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

// Action creators are generated for each case reducer function
export const { actions: countDoctorActions } = countDoctorSlice;
export const { reducer: countDoctorReducer } = countDoctorSlice;
