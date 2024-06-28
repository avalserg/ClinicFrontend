import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { fetchPatientById } from '../services/fetchPatientById';
import { Patient, PatientDetailsSchema } from '../types/patient';

const initialState: PatientDetailsSchema = {
    isLoading: false,
    error: undefined,
    data: undefined,
};

export const patientSlice = createSlice({
    name: 'patient',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPatientById.pending, (state) => {
            state.error = undefined;
            state.isLoading = true;
        });
        builder.addCase(
            fetchPatientById.fulfilled,
            (state, action: PayloadAction<Patient>) => {
                state.isLoading = false;

                state.data = action.payload;
            },
        );
        builder.addCase(fetchPatientById.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
    },
});

// Action creators are generated for each case reducer function
export const { actions: patientActions } = patientSlice;
export const { reducer: patientReducer } = patientSlice;
