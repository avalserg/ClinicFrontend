import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/App/Providers/StoreProvider';
import { CountPatientTicketsOnMonthPerYearSchema, CountPatientTicketsOnTimePerDaySchema } from '../types/patientTicket';

export const fetchCountPatientTicketsOnMonthPerYear = createAsyncThunk<
    CountPatientTicketsOnMonthPerYearSchema,
    void,
    ThunkConfig<string>
>(
    'patientTicket/fetchCountPatientTicketsOnMonthPerYear',
    async (_, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
            const response =
                await extra.api.get<CountPatientTicketsOnMonthPerYearSchema>(
                    `http://localhost:5289/PatientTickets/countOnMonthPerYear`,
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
    },
);
