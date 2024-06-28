import { createAsyncThunk } from '@reduxjs/toolkit';
import { Appointment } from '@/Entities/Appointment/Model/types/appointment';
import { ThunkConfig } from '@/App/Providers/StoreProvider';
import { $apiMedicalCards } from '@/Shared/API/api';
import {
    getAppointmentAnamnesis,
    getAppointmentEpicrisis,
} from '../selectors/patientTicketsPageSelectors';
import { getUserAuthData } from '@/Entities/ApplicationUser';

export const createAppointment = createAsyncThunk<
    Appointment,
    string,
    ThunkConfig<string>
>('patientTicketPage/createAppointment', async (patientId, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;

    const doctorId = getUserAuthData(getState())?.applicationUserId;
    const descriptionEpicrisis = getAppointmentEpicrisis(getState());
    const descriptionAnamnesis = getAppointmentAnamnesis(getState());
    try {
        const response = await $apiMedicalCards.post<Appointment>(
            `/Appointments`,
            {
                patientId,
                doctorId,
                descriptionEpicrisis,
                descriptionAnamnesis,
            },
        );
        if (!response.data) {
            throw new Error();
        }
        return response.data;
    } catch (e) {
        return rejectWithValue('');
    }
});
