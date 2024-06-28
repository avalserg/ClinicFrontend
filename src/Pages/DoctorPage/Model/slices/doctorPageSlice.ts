import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Doctor } from '@/Entities/Doctor';
import { fetchDoctorsList } from '../services/fetchDoctorsList';
import { DoctorsPageSchema } from '../types/doctorPageSchema';
import { createPatientTicket } from '../../../../Entities/PatientTicket/Model/services/createPatientTicket';
import { PatientTicketSchema } from '@/Entities/PatientTicket/Model/types/patientTicket';
import { updateDoctorData } from '../services/updateDoctor';
import { fetchPatientTicketById } from '@/Entities/PatientTicket/Model/services/fetchPatientTicketById/fetchPatientTicketById';
import { fetchBusyTimeForPatientTicketsByDate } from '../services/fetchBusyTimeForPatientTicketsByDate';

const initialState: DoctorsPageSchema = {
    isLoading: false,
    error: undefined,
    data: undefined,
};

const doctorPageSlice = createSlice({
    name: 'doctorPageSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDoctorsList.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                fetchDoctorsList.fulfilled,
                (state, action: PayloadAction<Doctor[]>) => {
                    state.isLoading = false;
                    // @ts-ignore
                    state.data = action.payload;
                },
            )
            .addCase(fetchDoctorsList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(updateDoctorData.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                updateDoctorData.fulfilled,
                (state, action: PayloadAction<Doctor>) => {
                    state.isLoading = false;
                    // @ts-ignore
                    state.data = action.payload;
                },
            )
            .addCase(updateDoctorData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { reducer: doctorPageReducer } = doctorPageSlice;
export const { actions: doctorPageActions } = doctorPageSlice;
