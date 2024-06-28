import { ThunkConfig } from '@/App/Providers/StoreProvider';
import { $apiPatientTickets } from '@/Shared/API/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const changePatientTicketIsVisited = createAsyncThunk<
    boolean,
    string,
    ThunkConfig<string>
>(
    'patientTicketPage/changePatientTicketIsVisited',
    async (patientTicketId, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;

        try {
            const response = await $apiPatientTickets.patch<boolean>(
                `/${patientTicketId}/IsVisited`,
            );
            if (!response.data) {
                throw new Error();
            }
            return response.data;
        } catch (e) {
            return rejectWithValue('');
        }
    },
);
