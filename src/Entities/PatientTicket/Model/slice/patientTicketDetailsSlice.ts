import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PatientTicketSchema } from '../types/patientTicket';
import { createPatientTicket } from '../services/createPatientTicket';

const initialState: PatientTicketSchema = {
    isLoading: false,
    error: '',
    dateAppointment: '',
    hoursAppointment: '',
    minutesAppointment: '',
    doctorId: '',
    patientId: '',
};

export const patientTicketDetailsSlice = createSlice({
    name: 'reviewDetails',
    initialState,
    reducers: {
        setPatientTicketDate: (
            state,
            action: PayloadAction<string | undefined>,
        ) => {
            state.dateAppointment = action.payload;
        },
        setPatientTicketHours: (
            state,
            action: PayloadAction<string | undefined>,
        ) => {
            state.hoursAppointment = action.payload;
        },
        setPatientTicketMinutes: (
            state,
            action: PayloadAction<string | undefined>,
        ) => {
            state.minutesAppointment = action.payload;
        },
        setPatientTicketDoctorId: (state, action: PayloadAction<string>) => {
            state.doctorId = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createPatientTicket.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                createPatientTicket.fulfilled,
                (state, action: PayloadAction<PatientTicketSchema>) => {
                    state.isLoading = false;
                    // // @ts-ignore
                    state.dateAppointment = undefined;
                    state.hoursAppointment = undefined;
                    state.minutesAppointment = undefined;
                },
            )
            .addCase(createPatientTicket.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

// Action creators are generated for each case reducer function
export const { actions: patientTicketDetailsActions } =
    patientTicketDetailsSlice;
export const { reducer: patientTicketDetailsReducer } =
    patientTicketDetailsSlice;
