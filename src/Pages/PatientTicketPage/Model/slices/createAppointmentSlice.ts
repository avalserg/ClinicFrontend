import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { CreateAppointmentSchema } from '../types/patientTicketPageSchema';
import { createAppointment } from '../services/createAppointment';
import { Appointment } from '@/Entities/Appointment/Model/types/appointment';

const initialState: CreateAppointmentSchema = {
    isLoading: false,
    error: undefined,
    descriptionEpicrisis: undefined,
    descriptionAnamnesis: undefined,
};

const createAppointmentSlice = createSlice({
    name: 'createAppointmentSlice',
    initialState,
    reducers: {
        setAppointmentEpicrisis: (state, action: PayloadAction<string>) => {
            state.descriptionEpicrisis = action.payload;
        },
        setAppointmentAnamnesis: (state, action: PayloadAction<string>) => {
            state.descriptionAnamnesis = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createAppointment.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                createAppointment.fulfilled,
                (state, action: PayloadAction<Appointment>) => {
                    state.isLoading = false;
                    // @ts-ignore
                    state.data = action.payload;
                },
            )
            .addCase(createAppointment.rejected, (state, action) => {
                state.isLoading = false;
            });
    },
});

export const { reducer: createAppointmentReducer } = createAppointmentSlice;
export const { actions: createAppointmentActions } = createAppointmentSlice;
