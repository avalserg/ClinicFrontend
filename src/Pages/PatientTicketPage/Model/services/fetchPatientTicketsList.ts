import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/App/Providers/StoreProvider';
import { getUserAuthData } from '@/Entities/ApplicationUser';
import { PatientTicket } from '@/Entities/PatientTicket';
import { $apiPatientTickets } from '@/Shared/API/api';

export const fetchAllPatientTicketsList = createAsyncThunk<
    PatientTicket[],
    void,
    ThunkConfig<string>
>('patientTicketsPage/fetchAllPatientTicketsList', async (props, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.get<PatientTicket[]>(
            `http://localhost:5289/PatientTickets?`,
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
export const fetchPatientTicketsListByPatientId = createAsyncThunk<
    PatientTicket[],
    void,
    ThunkConfig<string>
>(
    'patientTicketsPage/fetchPatientTicketsListByPatientId',
    async (props, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;
        const patientId = getUserAuthData(getState())?.applicationUserId;
        try {
            const response = await $apiPatientTickets.get<PatientTicket[]>('', {
                params: {
                    patientId,
                },
            });
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
export const fetchPatientTicketsListByDoctorId = createAsyncThunk<
    PatientTicket[],
    void,
    ThunkConfig<string>
>(
    'patientTicketsPage/fetchPatientTicketsListByDoctorId',
    async (props, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;
        const doctorId = getUserAuthData(getState())?.applicationUserId;
        try {
            const response = await $apiPatientTickets.get<PatientTicket[]>('', {
                params: {
                    doctorId,
                },
            });
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
