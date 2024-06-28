import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchDoctorProfileData } from '../services/fetchProfileData/fetchProfileData';
import { updateDoctorProfileData } from '../services/updateProfileData/updateProfileData';
import { DoctorProfile, Profile } from '@/Entities/Profile';
import { DoctorProfileSchema } from '../types/editableProfileCardSchema';

const initialState: DoctorProfileSchema = {
    readonly: true,
    isLoading: false,
    isSuccessUpdate: false,
    error: undefined,
    data: undefined,
};

export const doctorProfileSlice = createSlice({
    name: 'doctorProfile',
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
        updateDoctorProfile: (state, action: PayloadAction<DoctorProfile>) => {
            state.form = {
                ...state.form,
                ...action.payload,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDoctorProfileData.pending, (state) => {
                state.error = undefined;

                state.isLoading = true;
            })
            .addCase(
                fetchDoctorProfileData.fulfilled,
                (state, action: PayloadAction<DoctorProfile>) => {
                    state.isLoading = false;
                    // @ts-ignore
                    state.data = action.payload.value;
                    // @ts-ignore
                    state.form = action.payload.value;
                },
            )
            .addCase(fetchDoctorProfileData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(updateDoctorProfileData.pending, (state) => {
                state.validateErrors = undefined;
                state.isLoading = true;
            })
            .addCase(
                updateDoctorProfileData.fulfilled,
                (state, action: PayloadAction<DoctorProfile>) => {
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
            .addCase(updateDoctorProfileData.rejected, (state, action) => {
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
export const { actions: doctorProfileActions } = doctorProfileSlice;
export const { reducer: doctorProfileReducer } = doctorProfileSlice;
