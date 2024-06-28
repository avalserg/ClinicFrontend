import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { CreatePrescriptionSchema } from '../types/patientTicketPageSchema';

import { createPrescription } from '../services/createPrescription';
import { Prescription } from '@/Entities/Prescription/Model/types/prescription';

const initialState: CreatePrescriptionSchema = {
    isLoading: false,
    error: undefined,
    medicineName: undefined,
    releaseForm: undefined,
    amount: undefined,
};

const createPrescriptionSlice = createSlice({
    name: 'createPrescriptionSlice',
    initialState,
    reducers: {
        setPrescriptionMedicineName: (state, action: PayloadAction<string>) => {
            state.medicineName = action.payload;
        },
        setPrescriptionReleaseForm: (state, action: PayloadAction<string>) => {
            state.releaseForm = action.payload;
        },
        setPrescriptionAmount: (state, action: PayloadAction<string>) => {
            state.amount = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createPrescription.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                createPrescription.fulfilled,
                (state, action: PayloadAction<Prescription>) => {
                    state.isLoading = false;
                    // @ts-ignore
                    state.data = action.payload;
                },
            )
            .addCase(createPrescription.rejected, (state, action) => {
                state.isLoading = false;
            });
    },
});

export const { reducer: createPrescriptionReducer } = createPrescriptionSlice;
export const { actions: createPrescriptionActions } = createPrescriptionSlice;
