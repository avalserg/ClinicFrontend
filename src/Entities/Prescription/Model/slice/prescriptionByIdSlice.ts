import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { fetchPrescriptionById } from '../services/fetchPrescriptionById';
import { Prescription, PrescriptionSchema } from '../types/prescription';

const initialState: PrescriptionSchema = {
    error: '',
    isLoading: false,
    data: undefined,
};

export const prescriptionsSlice = createSlice({
    name: 'prescriptionsSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(fetchPrescriptionById.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                fetchPrescriptionById.fulfilled,
                (state, action: PayloadAction<Prescription>) => {
                    state.isLoading = false;
                    state.data = action.payload;
                },
            )
            .addCase(fetchPrescriptionById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

// Action creators are generated for each case reducer function
export const { actions: prescriptionsActions } = prescriptionsSlice;
export const { reducer: prescriptionsReducer } = prescriptionsSlice;
