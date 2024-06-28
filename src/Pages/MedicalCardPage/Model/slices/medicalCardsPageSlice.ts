import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchAllMedicalCardsList } from '../services/fetchMedicalCardsList';
import { MedicalCardsPageSchema } from '../types/medicalCardsPageSchema';
import { MedicalCard } from '@/Entities/MedicalCard/Model/types/medicalCard';

const initialState: MedicalCardsPageSchema = {
    isLoading: false,
    error: undefined,
    data: undefined,
};

const medicalCardsPageSlice = createSlice({
    name: 'medicalCardsPageSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllMedicalCardsList.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                fetchAllMedicalCardsList.fulfilled,
                (state, action: PayloadAction<MedicalCard[]>) => {
                    state.isLoading = false;
                    // @ts-ignore
                    state.data = action.payload;
                },
            )
            .addCase(fetchAllMedicalCardsList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { reducer: medicalCardsPageReducer } = medicalCardsPageSlice;
export const { actions: medicalCardsPageActions } = medicalCardsPageSlice;
