import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ThunkConfig } from '@/App/Providers/StoreProvider';
import { Doctor } from '@/Entities/Doctor';

export const updateDoctorData = createAsyncThunk<
    // return
    Doctor,
    // args
    Doctor,
    ThunkConfig<string>
>('profile/updateProfileData', async (doctor, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;
    // inside async Thunk use getstate
    // formData get from state
    const {
        id,
        firstName,
        lastName,
        patronymic,
        cabinetNumber,
        category,
        experience,
        phoneNumber,
        address,
        dateBirthday,
        speciality,
    } = doctor;
    try {
        // formData body send to server
        const response = await axios.put<Doctor>(
            `http://localhost:5015/Doctors/${id}`,
            {
                address,
                id,
                dateBirthday,
                firstName,
                lastName,
                patronymic,
                phoneNumber,
                cabinetNumber,
                experience,
                category,
                speciality,
            },
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
        return rejectWithValue('');
    }
});
