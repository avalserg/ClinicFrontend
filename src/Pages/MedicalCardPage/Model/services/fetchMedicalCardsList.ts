import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/App/Providers/StoreProvider';
import { MedicalCard } from '@/Entities/MedicalCard/Model/types/medicalCard';
import { $apiMedicalCards } from '@/Shared/API/api';

export const fetchAllMedicalCardsList = createAsyncThunk<
    MedicalCard[],
    void,
    ThunkConfig<string>
>('medicalCardsPage/fetchAllMedicalCardsList', async (props, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        const response = await $apiMedicalCards.get<MedicalCard[]>('/MedicalCards');
        if (!response.data) {
            throw new Error();
        }

        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});
