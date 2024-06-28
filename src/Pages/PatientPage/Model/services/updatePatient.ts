import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ThunkConfig } from '@/App/Providers/StoreProvider';

import { Patient } from '@/Entities/Patient';

export const updatePatientData = createAsyncThunk<
    // return
    Patient,
    // args
    Patient,
    ThunkConfig<string>
>('patientPage/updatePatientData', async (patient, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;
    // inside async Thunk use getstate
    // formData get from state
    const {
        id,
        firstName,
        lastName,
        patronymic,
        phoneNumber,
        address,
        dateBirthday,
        passportNumber,
    } = patient;
    try {
        // formData body send to server
        const response = await axios.put<Patient>(
            `http://localhost:5015/Patients/${id}`,
            {
                address,
                dateBirthday,
                firstName,
                lastName,
                patronymic,
                phoneNumber,
                passportNumber,
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
