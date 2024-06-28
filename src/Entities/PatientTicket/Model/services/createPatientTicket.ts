import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/App/Providers/StoreProvider';
import { getUserAuthData } from '@/Entities/ApplicationUser';
import { PatientTicket } from '@/Entities/PatientTicket/Model/types/patientTicket';
import { PatientTicketSchema } from '@/Entities/PatientTicket/Model/types/patientTicket';
import { getPatientTicketDate } from '@/Entities/PatientTicket/Model/selectors/getPatientTicketDate/getPatientTicketDate';
import { getPatientTicketDoctorId } from '@/Entities/PatientTicket/Model/selectors/getPatientTicketDoctorId/getPatientTicketDoctorId';
import { getPatientTicketMinutes } from '@/Entities/PatientTicket/Model/selectors/getPatientTicketMinutes/getPatientTicketMinutes';
import { getPatientTicketHours } from '@/Entities/PatientTicket/Model/selectors/getPatientTicketHours/getPatientTicketHours';

export const createPatientTicket = createAsyncThunk<
    PatientTicket,
    void,
    ThunkConfig<string>
>('doctorsPage/createPatientTicket', async (props, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;

    const patientId = getUserAuthData(getState())?.applicationUserId;
    const patientTicketData = getPatientTicketDate(getState());
    const patientTicketDoctorId = getPatientTicketDoctorId(getState());
    const patientTicketMinutes = getPatientTicketMinutes(getState());
    const patientTicketHours = getPatientTicketHours(getState());
    try {
        const response = await extra.api.post<PatientTicket>(
            `http://localhost:5289/PatientTickets`,
            {
                patientId,
                dateAppointment: patientTicketData,
                doctorId: patientTicketDoctorId,
                hoursAppointment: patientTicketHours,
                minutesAppointment: patientTicketMinutes,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
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
