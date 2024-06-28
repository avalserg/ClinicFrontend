import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchAdminProfileData } from '../services/fetchProfileData/fetchProfileData';
import { AdminProfile, Profile } from '@/Entities/Profile';
import { AdminProfileSchema } from '../types/editableProfileCardSchema';
import { updateAdminProfileData } from '../services/updateProfileData/updateProfileData';

const initialState: AdminProfileSchema = {
    readonly: true,
    isLoading: false,
    isSuccessUpdate: false,
    error: undefined,
    data: undefined,
};

export const adminProfileSlice = createSlice({
    name: 'adminProfile',
    initialState,
    reducers: {
        setReadonly: (state, action: PayloadAction<boolean>) => {
            state.readonly = action.payload;
            state.isSuccessUpdate = false;
        },
        // reset inputs
        cancelEdit: (state) => {
            state.readonly = true;
            state.validateErrors = undefined;
            state.form = state.data;
            state.isSuccessUpdate = false;
        },
        // update all data from State
        updateAdminProfile: (state, action: PayloadAction<AdminProfile>) => {
            state.form = {
                ...state.form,
                ...action.payload,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdminProfileData.pending, (state) => {
                state.error = undefined;

                state.isLoading = true;
            })
            .addCase(
                fetchAdminProfileData.fulfilled,
                (state, action: PayloadAction<Profile>) => {
                    state.isLoading = false;

                    state.data = action.payload;
                    state.form = action.payload;
                },
            )
            .addCase(fetchAdminProfileData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(updateAdminProfileData.pending, (state) => {
                state.validateErrors = undefined;
                state.isLoading = true;
            })
            .addCase(
                updateAdminProfileData.fulfilled,
                (state, action: PayloadAction<AdminProfile>) => {
                    state.isLoading = false;

                    state.data = action.payload;
                    state.form = action.payload;
                    // after editing return in readoly state
                    state.readonly = true;
                    state.validateErrors = undefined;
                    state.error = undefined;
                    state.isSuccessUpdate = true;
                },
            )
            .addCase(updateAdminProfileData.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccessUpdate = false;
                // from server
                if (typeof action.payload === 'string') {
                    state.error = action.payload;
                }
                // from client
                else {
                    const r = typeof action.payload;
                    state.validateErrors = action.payload;
                }
            });
    },
});

// Action creators are generated for each case reducer function
export const { actions: adminProfileActions } = adminProfileSlice;
export const { reducer: adminProfileReducer } = adminProfileSlice;
