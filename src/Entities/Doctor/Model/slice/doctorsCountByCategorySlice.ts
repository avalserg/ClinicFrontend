import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { CountDoctorsByCategorySchema } from '../types/doctor';
import { fetchCountDoctorsByCategory } from '../services/fetchCountDoctorsByCategory';

const initialState: CountDoctorsByCategorySchema = {
    value: undefined,
    error: '',
    isLoading: false,
};

export const doctorsCountByCategorySlice = createSlice({
    name: 'doctorsCountByCategory',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(fetchCountDoctorsByCategory.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                fetchCountDoctorsByCategory.fulfilled,
                (
                    state,
                    action: PayloadAction<CountDoctorsByCategorySchema>,
                ) => {
                    state.isLoading = false;

                    state.value = action.payload.value;
                },
            )
            .addCase(fetchCountDoctorsByCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

// Action creators are generated for each case reducer function
export const { actions: countDoctorByCategoryActions } =
    doctorsCountByCategorySlice;
export const { reducer: countDoctorByCategoryReducer } =
    doctorsCountByCategorySlice;
