import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ThunkConfig } from '@/App/Providers/StoreProvider';
import {
    LOCAL_STORAGE_LAST_DESIGN_KEY,
    USER_LOCALSTORAGE_KEY,
} from '@/Shared/const/localStorage';
import { getUserDataByIdQuery } from '../../api/applicationUserApi';
import { ApplicationUser } from '../types/applicationUser';
import { $api } from '@/Shared/API/api';
import { Patient } from '@/Entities/Patient';
import { useSelector } from 'react-redux';
import { isUserDoctor, isUserPatient } from '../selectors/roleSelectors';
import { ApplicationUserRoleName } from '../consts/applicationUserConsts';
import { Doctor } from '@/Entities/Doctor';
import { getProfileForm } from '@/Features/editableProfileCard/Model/selectors/getProfileForm/getProfileForm';

export const initAuthData = createAsyncThunk<
    ApplicationUser,
    void,
    ThunkConfig<string>
>('user/initAuthData', async (newJsonSettings, thunkApi) => {
    const { rejectWithValue, getState } = thunkApi;
    const user = localStorage.getItem(USER_LOCALSTORAGE_KEY);

    if (!user) {
        return rejectWithValue('');
    }

    try {
        const userData = await $api.get<ApplicationUser>(
            `http://localhost:5015/Users/CurrentUser`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Access-Control-Allow-Origin': '*',
                },
            },
        );

        if (
            userData.data.applicationUserRole.name.toLocaleUpperCase() ===
            ApplicationUserRoleName.PATIENT
        ) {
            const user = await $api.get<Patient>(
                `http://localhost:5015/Patients/${userData.data.applicationUserId}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        'Access-Control-Allow-Origin': '*',
                    },
                },
            );

            userData.data.avatar = user.data.avatar;
        }
        if (
            userData.data.applicationUserRole.name.toLocaleUpperCase() ===
            ApplicationUserRoleName.DOCTOR
        ) {
            const user = await $api.get<Doctor>(
                `http://localhost:5015/Doctors/${userData.data.applicationUserId}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        'Access-Control-Allow-Origin': '*',
                    },
                },
            );
            userData.data.avatar = user.data.photo;
        }

        return userData.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('');
    }
});
