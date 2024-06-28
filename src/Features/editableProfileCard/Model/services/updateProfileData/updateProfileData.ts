/* eslint-disable @typescript-eslint/no-invalid-void-type */
/* eslint-disable @typescript-eslint/indent */
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { ThunkConfig } from '@/App/Providers/StoreProvider';
import { ValidateProfileError } from '../../consts/consts';
import {
    getAdminProfileForm,
    getDoctorProfileForm,
    getProfileForm,
} from '../../selectors/getProfileForm/getProfileForm';
import {
    validateAdminProfileData,
    validateProfileData,
} from '../validateProfileData/validateProfileData';
import {
    AdminProfile,
    DoctorProfile,
    PatientProfile,
} from '@/Entities/Profile';

export const updatePatientProfileData = createAsyncThunk<
    // return
    PatientProfile,
    // args
    void,
    ThunkConfig<ValidateProfileError[]>
>('profile/updateProfileData', async (_, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;
    // inside async Thunk use getstate
    // formData get from state
    const formData = getProfileForm(getState());
    const errors = validateProfileData(formData);
    if (errors.length) {
        return rejectWithValue(errors);
    }
    try {
        // formData body send to server
        const response = await axios.put<PatientProfile>(
            `http://localhost:5015/Patients/${formData?.applicationUserId}`,
            { ...formData },
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
        // from serber bad result
        if (e instanceof AxiosError && e.code !== 'ERR_NETWORK') {
            // @ts-ignore
            return rejectWithValue(e.response?.data.detail.toString());
        }
        // if server unavailable
        return rejectWithValue([ValidateProfileError.SERVER_ERROR]);
    }
});

export const updateDoctorProfileData = createAsyncThunk<
    // return
    DoctorProfile,
    // args
    void,
    ThunkConfig<ValidateProfileError[]>
>('profile/updateProfileData', async (_, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;
    // inside async Thunk use getstate
    // formData get from state
    const formData = getDoctorProfileForm(getState());
    const errors = validateProfileData(formData);
    if (errors.length) {
        return rejectWithValue(errors);
    }
    try {
        // formData body send to server
        const response = await axios.put<DoctorProfile>(
            `http://localhost:5015/Doctors/${formData?.applicationUserId}`,
            { ...formData },
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
        // from serber bad result
        if (e instanceof AxiosError && e.code !== 'ERR_NETWORK') {
            // @ts-ignore
            return rejectWithValue(e.response?.data.detail.toString());
        }
        // if server unavailable
        return rejectWithValue([ValidateProfileError.SERVER_ERROR]);
    }
});

export const updateAdminProfileData = createAsyncThunk<
    // return
    AdminProfile,
    // args
    void,
    ThunkConfig<ValidateProfileError[]>
>('profile/updateProfileData', async (_, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;
    // inside async Thunk use getstate
    // formData get from state
    const formData = getAdminProfileForm(getState());
    const errors = validateAdminProfileData(formData);
    if (errors.length) {
        return rejectWithValue(errors);
    }
    try {
        // formData body send to server
        const response = await axios.put<AdminProfile>(
            `http://localhost:5015/Administrators/${formData?.applicationUserId}`,
            { ...formData },
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
        // from serber bad result
        if (e instanceof AxiosError && e.code !== 'ERR_NETWORK') {
            // @ts-ignore
            return rejectWithValue(e.response?.data.detail.toString());
        }
        // if server unavailable
        return rejectWithValue([ValidateProfileError.SERVER_ERROR]);
    }
});
