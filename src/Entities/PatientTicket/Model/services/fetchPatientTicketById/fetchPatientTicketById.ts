import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/App/Providers/StoreProvider';
import { PatientTicket} from '../../types/patientTicket';

export const fetchPatientTicketById = createAsyncThunk<
    PatientTicket,
    string | undefined,
    ThunkConfig<string>
>('reviewDetails/fetchReviewById', async (patientTicketId, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        if (!patientTicketId) {
            throw new Error('');
        }

        const response = await extra.api.get<PatientTicket>(
            `http://localhost:5289/PatientTickets/${patientTicketId}`,
        );
        if (!response.data) {
            throw new Error();
        }
        return response.data;
    } catch (e) {
        return rejectWithValue('error');
    }
});
