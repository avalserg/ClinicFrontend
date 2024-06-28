import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { fetchAdminById } from '../services/fetchAdminById';
import { Admin, AdminDetailsSchema } from '../types/admin';

const initialState: AdminDetailsSchema = {
    isLoading: false,
    error: undefined,
    data: undefined,
};

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAdminById.pending, (state) => {
            state.error = undefined;
            state.isLoading = true;
        });
        builder.addCase(
            fetchAdminById.fulfilled,
            (state, action: PayloadAction<Admin>) => {
                state.isLoading = false;

                state.data = action.payload;
            },
        );
        builder.addCase(fetchAdminById.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
    },
});

// Action creators are generated for each case reducer function
export const { actions: adminActions } = adminSlice;
export const { reducer: adminReducer } = adminSlice;
