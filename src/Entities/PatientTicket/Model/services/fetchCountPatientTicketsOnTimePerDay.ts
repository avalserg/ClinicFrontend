import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/App/Providers/StoreProvider';
import { CountPatientTicketsOnTimePerDaySchema } from '../types/patientTicket';


export const fetchCountPatientTicketsOnTimePerDay = createAsyncThunk<
    CountPatientTicketsOnTimePerDaySchema,
    void,
    ThunkConfig<string>
>('patientTicket/fetchCountPatientTicketsOnTimePerDay', async (_, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        const response =
            await extra.api.get<CountPatientTicketsOnTimePerDaySchema>(
                `http://localhost:5289/PatientTickets/countOnTimePerDay`,
            );

        // const statusCode = response.status;
        // if (statusCode === 403) {
        //     return rejectWithValue('Forbidden');
        // }
        if (!response.data) {
            throw new Error();
        }
        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});
