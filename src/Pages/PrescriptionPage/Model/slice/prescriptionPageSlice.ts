import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import {
    fetchAllPrescriptionsList,
    fetchPrescriptionsListByDoctorId,
    fetchPrescriptionsListByPatientId,
} from '../services/fetchPrescriptionsList';
import { Prescription } from '@/Entities/Prescription/Model/types/prescription';
import { PrescriptionsPageSchema } from '../types/prescriptionsPageSchema';

const initialState: PrescriptionsPageSchema = {
    isLoading: false,
    error: undefined,
    data: undefined,
};

const prescriptionsPageSlice = createSlice({
    name: 'prescriptionsPageSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllPrescriptionsList.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                fetchAllPrescriptionsList.fulfilled,
                (state, action: PayloadAction<Prescription[]>) => {
                    state.isLoading = false;
                    // @ts-ignore
                    state.data = action.payload;
                },
            )
            .addCase(fetchAllPrescriptionsList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(fetchPrescriptionsListByDoctorId.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                fetchPrescriptionsListByDoctorId.fulfilled,
                (state, action: PayloadAction<Prescription[]>) => {
                    state.isLoading = false;
                    // @ts-ignore
                    state.data = action.payload;
                },
            )
            .addCase(
                fetchPrescriptionsListByDoctorId.rejected,
                (state, action) => {
                    state.isLoading = false;
                    state.error = action.payload;
                },
            )
            .addCase(fetchPrescriptionsListByPatientId.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                fetchPrescriptionsListByPatientId.fulfilled,
                (state, action: PayloadAction<Prescription[]>) => {
                    state.isLoading = false;
                    // @ts-ignore
                    state.data = action.payload;
                },
            )
            .addCase(
                fetchPrescriptionsListByPatientId.rejected,
                (state, action) => {
                    state.isLoading = false;
                    state.error = action.payload;
                },
            );
    },
});

export const { reducer: prescriptionsPageReducer } = prescriptionsPageSlice;
export const { actions: prescriptionsPageActions } = prescriptionsPageSlice;
