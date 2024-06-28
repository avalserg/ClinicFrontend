import { createAsyncThunk } from '@reduxjs/toolkit';
import { Appointment } from '@/Entities/Appointment/Model/types/appointment';
import { ThunkConfig } from '@/App/Providers/StoreProvider';
import { $apiMedicalCards } from '@/Shared/API/api';
import {
    getAppointmentAnamnesis,
    getAppointmentEpicrisis,
    getPrescriptionAmount,
    getPrescriptionMedicineName,
    getPrescriptionReleaseForm,
} from '../selectors/patientTicketsPageSelectors';
import { getUserAuthData } from '@/Entities/ApplicationUser';
import { Prescription } from '@/Entities/Prescription/Model/types/prescription';

export const createPrescription = createAsyncThunk<
    Prescription,
    string,
    ThunkConfig<string>
>('patientTicketPage/createPrescription', async (patientId, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;

    const medicineName = getPrescriptionMedicineName(getState());
    const releaseForm = getPrescriptionReleaseForm(getState());
    const amount = getPrescriptionAmount(getState());

    try {
        const response = await $apiMedicalCards.post<Prescription>(
            `/Prescription`,
            {
                patientId,
                medicineName,
                releaseForm,
                amount,
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
