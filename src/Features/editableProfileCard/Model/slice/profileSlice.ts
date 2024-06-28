import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
    fetchAdminProfileData,
    fetchDoctorProfileData,
    fetchPatientProfileData,
} from '../services/fetchProfileData/fetchProfileData';
import {
    updateAdminProfileData,
    updatePatientProfileData,
} from '../services/updateProfileData/updateProfileData';
import { PatientProfile, Profile } from '@/Entities/Profile';
import { PatientProfileSchema } from '../types/editableProfileCardSchema';

const initialState: PatientProfileSchema = {
    readonly: true,
    isLoading: false,
    isSuccessUpdate: false,
    error: undefined,
    data: undefined,
};

export const profileSlice = createSlice({
    name: 'profile',
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
        updateProfile: (state, action: PayloadAction<PatientProfile>) => {
            state.form = {
                ...state.form,
                ...action.payload,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPatientProfileData.pending, (state) => {
                state.error = undefined;

                state.isLoading = true;
            })
            .addCase(
                fetchPatientProfileData.fulfilled,
                (state, action: PayloadAction<Profile>) => {
                    state.isLoading = false;

                    state.data = action.payload;
                    
                    state.form = action.payload;
                },
            )
            .addCase(fetchPatientProfileData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // .addCase(fetchDoctorProfileData.pending, (state) => {
            //     state.error = undefined;

            //     state.isLoading = true;
            // })
            // .addCase(
            //     fetchDoctorProfileData.fulfilled,
            //     (state, action: PayloadAction<Profile>) => {
            //         state.isLoading = false;

            //         state.data = action.payload;
            //         state.form = action.payload;
            //     },
            // )
            // .addCase(fetchDoctorProfileData.rejected, (state, action) => {
            //     state.isLoading = false;
            //     state.error = action.payload;
            // })
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
            .addCase(updatePatientProfileData.pending, (state) => {
                state.validateErrors = undefined;
                state.isLoading = true;
            })
            .addCase(
                updatePatientProfileData.fulfilled,
                (state, action: PayloadAction<Profile>) => {
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
            .addCase(updatePatientProfileData.rejected, (state, action) => {
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
                // state.validateErrors = action.payload;
            });
    },
});

// Action creators are generated for each case reducer function
export const { actions: profileActions } = profileSlice;
export const { reducer: profileReducer } = profileSlice;
