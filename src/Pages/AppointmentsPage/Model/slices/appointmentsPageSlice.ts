import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import {
    fetchAllAppointmentsList,
    fetchAppointmentsListByDoctorId,
    fetchAppointmentsListByPatientId,
} from '../services/fetchAppointmentsList';
import { Appointment } from '@/Entities/Appointment/Model/types/appointment';
import { AppointmentsPageSchema } from '../types/appointmentPageSchema';

const initialState: AppointmentsPageSchema = {
    isLoading: false,
    error: undefined,
    data: undefined,
};

const appointmentsPageSlice = createSlice({
    name: 'appointmentsPageSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllAppointmentsList.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                fetchAllAppointmentsList.fulfilled,
                (state, action: PayloadAction<Appointment[]>) => {
                    state.isLoading = false;
                    // @ts-ignore
                    state.data = action.payload;
                },
            )
            .addCase(fetchAllAppointmentsList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(fetchAppointmentsListByDoctorId.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                fetchAppointmentsListByDoctorId.fulfilled,
                (state, action: PayloadAction<Appointment[]>) => {
                    state.isLoading = false;
                    // @ts-ignore
                    state.data = action.payload;
                },
            )
            .addCase(
                fetchAppointmentsListByDoctorId.rejected,
                (state, action) => {
                    state.isLoading = false;
                    state.error = action.payload;
                },
            )
            .addCase(fetchAppointmentsListByPatientId.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                fetchAppointmentsListByPatientId.fulfilled,
                (state, action: PayloadAction<Appointment[]>) => {
                    state.isLoading = false;
                    // @ts-ignore
                    state.data = action.payload;
                },
            )
            .addCase(
                fetchAppointmentsListByPatientId.rejected,
                (state, action) => {
                    state.isLoading = false;
                    state.error = action.payload;
                },
            );
    },
});

export const { reducer: appointmentsPageReducer } = appointmentsPageSlice;
export const { actions: appointmentsPageActions } = appointmentsPageSlice;
