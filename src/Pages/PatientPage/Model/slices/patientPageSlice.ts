import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { PatientsPageSchema } from '../types/patientPageSchema';

import { Patient } from '@/Entities/Patient';
import { fetchPatientsList } from '../services/fetchPatientsList';
import { updatePatientData } from '../services/updatePatient';

const initialState: PatientsPageSchema = {
    isLoading: false,
    error: undefined,
    data: undefined,
};

const patientPageSlice = createSlice({
    name: 'patientPageSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPatientsList.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                fetchPatientsList.fulfilled,
                (state, action: PayloadAction<Patient[]>) => {
                    state.isLoading = false;
                    // @ts-ignore
                    state.data = action.payload;
                },
            )
            .addCase(fetchPatientsList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(updatePatientData.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                updatePatientData.fulfilled,
                (state, action: PayloadAction<Patient>) => {
                    state.isLoading = false;
                    // @ts-ignore
                    state.data = action.payload;
                },
            )
            .addCase(updatePatientData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { reducer: patientPageReducer } = patientPageSlice;
export const { actions: patientPageActions } = patientPageSlice;
