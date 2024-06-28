import { ThunkConfig } from '@/App/Providers/StoreProvider';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchBusyTimeForPatientTicketsByDate = createAsyncThunk<
    Array<string>,
    { doctorId: string; dateAppointment: string },
    ThunkConfig<string>
>(
    'doctorPage/fetchBusyTimeForPatientTicketsByDate',
    async (
        {
            doctorId,
            dateAppointment,
        }: { doctorId: string; dateAppointment: string },
        thunkApi,
    ) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
            const response = await extra.api.get<string[]>(
                `http://localhost:5289/PatientTickets/${doctorId}/dateAppointment`,
                {
                    params: {
                        dateAppointment,
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
