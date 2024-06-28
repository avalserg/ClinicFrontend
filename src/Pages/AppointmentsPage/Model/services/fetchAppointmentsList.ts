import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/App/Providers/StoreProvider';
import { getUserAuthData } from '@/Entities/ApplicationUser';
import { PatientTicket } from '@/Entities/PatientTicket';
import { $apiMedicalCards, $apiPatientTickets } from '@/Shared/API/api';
import { Appointment } from '@/Entities/Appointment/Model/types/appointment';

export const fetchAllAppointmentsList = createAsyncThunk<
    Appointment[],
    void,
    ThunkConfig<string>
>('appointmentsPage/fetchAllAppointmentsList', async (props, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        const response = await $apiMedicalCards.get<Appointment[]>(
            `/Appointments?`,
        );
        if (!response.data) {
            throw new Error();
        }

        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});

export const fetchAppointmentsListByDoctorId = createAsyncThunk<
    Appointment[],
    void,
    ThunkConfig<string>
>(
    'appointmentsPage/fetchAppointmentsListByDoctorId',
    async (props, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;
        const doctorId = getUserAuthData(getState())?.applicationUserId;
        try {
            const response = await $apiMedicalCards.get<Appointment[]>(
                '/Appointments',
                {
                    params: {
                        doctorId,
                    },
                },
            );
            if (!response.data) {
                throw new Error();
            }
            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('error');
        }
    },
);

// for medical card
export const fetchAppointmentsListByPatientId = createAsyncThunk<
    Appointment[],
    string,
    ThunkConfig<string>
>(
    'appointmentsPage/fetchAppointmentsListByPatientId',
    async (patientId, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;

        try {
            const response = await $apiMedicalCards.get<Appointment[]>(
                '/Appointments',
                {
                    params: {
                        patientId,
                    },
                },
            );
            if (!response.data) {
                throw new Error();
            }
            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('error');
        }
    },
);
