import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/App/Providers/StoreProvider';

export const removePatientTicket = createAsyncThunk<
    void,
    string,
    ThunkConfig<string>
>('patientTicketPagePage/removePatientTicket', async (id, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;
    try {
        const response = await extra.api.delete<void>(
            `http://localhost:5289/PatientTickets`,
            {
                data: {
                    id,
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            },
        );
        if (!response.status) {
            throw new Error();
        }
        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});
