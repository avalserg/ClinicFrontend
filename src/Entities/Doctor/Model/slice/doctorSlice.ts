import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { fetchDoctorById } from '../services/fetchDoctorById';
import { Doctor, DoctorDetailsSchema } from '../types/doctor';

const initialState: DoctorDetailsSchema = {
    isLoading: false,
    error: undefined,
    data: undefined,
};

export const doctorSlice = createSlice({
    name: 'doctor',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDoctorById.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                fetchDoctorById.fulfilled,
                (state, action: PayloadAction<Doctor>) => {
                    state.isLoading = false;

                    state.data = action.payload;
                },
            );
    },
});

// Action creators are generated for each case reducer function
export const { actions: doctorActions } = doctorSlice;
export const { reducer: doctorReducer } = doctorSlice;
