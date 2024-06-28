import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/App/Providers/StoreProvider';
import { getUserAuthData } from '@/Entities/ApplicationUser';

import { $apiMedicalCards } from '@/Shared/API/api';
import { Prescription } from '@/Entities/Prescription/Model/types/prescription';

export const fetchAllPrescriptionsList = createAsyncThunk<
    Prescription[],
    void,
    ThunkConfig<string>
>('prescriptionsPage/fetchAllPrescriptionsList', async (props, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        const response =
            await $apiMedicalCards.get<Prescription[]>(`/Prescription`);
        if (!response.data) {
            throw new Error();
        }

        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});

export const fetchPrescriptionsListByDoctorId = createAsyncThunk<
    Prescription[],
    void,
    ThunkConfig<string>
>(
    'prescriptionsPage/fetchPrescriptionsListByDoctorId',
    async (props, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;
        const doctorId = getUserAuthData(getState())?.applicationUserId;
        try {
            const response = await $apiMedicalCards.get<Prescription[]>(
                `/Prescription`,
                {
                    params: {
                        doctorId,
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
export const fetchPrescriptionsListByPatientId = createAsyncThunk<
    Prescription[],
    void,
    ThunkConfig<string>
>(
    'prescriptionsPage/fetchPrescriptionsListByPatientId',
    async (props, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;
        const patientId = getUserAuthData(getState())?.applicationUserId;
        try {
            const response = await $apiMedicalCards.get<Prescription[]>(
                `/Prescription`,
                {
                    params: {
                        patientId,
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
