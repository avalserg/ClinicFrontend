import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PatientTicketsPageSchema } from '../types/patientTicketPageSchema';
import {
    fetchAllPatientTicketsList,
    fetchPatientTicketsListByDoctorId,
    fetchPatientTicketsListByPatientId,
} from '../services/fetchPatientTicketsList';
import { PatientTicket } from '@/Entities/PatientTicket';

const initialState: PatientTicketsPageSchema = {
    isLoading: false,
    error: undefined,
    data: undefined,
};

const patientTicketsPageSlice = createSlice({
    name: 'patientTicketsPageSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllPatientTicketsList.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                fetchAllPatientTicketsList.fulfilled,
                (state, action: PayloadAction<PatientTicket[]>) => {
                    state.isLoading = false;
                    // @ts-ignore
                    state.data = action.payload;
                },
            )
            .addCase(fetchAllPatientTicketsList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(fetchPatientTicketsListByPatientId.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                fetchPatientTicketsListByPatientId.fulfilled,
                (state, action: PayloadAction<PatientTicket[]>) => {
                    state.isLoading = false;
                    // @ts-ignore
                    state.data = action.payload;
                },
            )
            .addCase(
                fetchPatientTicketsListByPatientId.rejected,
                (state, action) => {
                    state.isLoading = false;
                    state.error = action.payload;
                },
            )
            .addCase(fetchPatientTicketsListByDoctorId.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                fetchPatientTicketsListByDoctorId.fulfilled,
                (state, action: PayloadAction<PatientTicket[]>) => {
                    state.isLoading = false;
                    // @ts-ignore
                    state.data = action.payload;
                },
            )
            .addCase(
                fetchPatientTicketsListByDoctorId.rejected,
                (state, action) => {
                    state.isLoading = false;
                    state.error = action.payload;
                },
            );
    },
});

export const { reducer: patientTicketsPageReducer } = patientTicketsPageSlice;
export const { actions: patientTicketsPageActions } = patientTicketsPageSlice;
