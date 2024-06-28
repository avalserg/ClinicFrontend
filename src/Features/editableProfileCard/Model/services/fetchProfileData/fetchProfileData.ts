/* eslint-disable @typescript-eslint/no-invalid-void-type */
/* eslint-disable @typescript-eslint/indent */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/App/Providers/StoreProvider';
import {
    ApplicationUser,
    isUserAdmin,
    isUserDoctor,
    isUserPatient,
} from '@/Entities/ApplicationUser';
import {
    AdminProfile,
    DoctorProfile,
    PatientProfile,
} from '@/Entities/Profile';
import {
    AdminProfileSchema,
    DoctorProfileSchema,
    PatientProfileSchema,
} from '../../types/editableProfileCardSchema';
import { useSelector } from 'react-redux';

export const fetchPatientProfileData = createAsyncThunk<
    PatientProfile,
    string,
    ThunkConfig<string>
>('profile/fetchPatientProfileData', async (profileId, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;
    try {
        const response = await extra.api.get<PatientProfile>(
            `http://localhost:5015/Patients/${profileId}`,
        );

        if (!response.data) {
            throw new Error();
        }
        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});
export const fetchDoctorProfileData = createAsyncThunk<
    DoctorProfile,
    string,
    ThunkConfig<string>
>('profile/fetchDoctorProfileData', async (profileId, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;
    try {
        const response = await extra.api.get<DoctorProfile>(
            `http://localhost:5015/Doctors/${profileId}`,
        );

        if (!response.data) {
            throw new Error();
        }
        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});

export const fetchAdminProfileData = createAsyncThunk<
    AdminProfile,
    string,
    ThunkConfig<string>
>('profile/fetchAdminProfileData', async (profileId, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.get<AdminProfile>(
            `http://localhost:5015/Administrators/${profileId}`,
        );

        // const statusCode = response.status;
        // if (statusCode === 403) {
        //     return rejectWithValue('Forbidden');
        // }
        if (!response.data) {
            throw new Error();
        }
        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});

export const fetchUserData = createAsyncThunk<
    ApplicationUser,
    string,
    ThunkConfig<string>
>('profile/fetchUserData', async (profileId, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        // const response = await extra.api.get<Profile>(`/profile/${profileId}`);

        const response = await extra.api.get<ApplicationUser>(
            `https://localhost:7190/Users/${profileId}`,
        );

        const statusCode = response.status;
        if (statusCode === 403) {
            return rejectWithValue('Forbidden');
        }
        if (!response.data) {
            throw new Error();
        }
        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});
// export const fetchDoctorData = createAsyncThunk<
//   Doctor,
//   string,
//   ThunkConfig<string>
// >("profile/fetchUserData", async (profileId, thunkApi) => {
//   const { extra, rejectWithValue } = thunkApi;

//   try {
//     // const response = await extra.api.get<Profile>(`/profile/${profileId}`);

//     const response = await extra.api.get<Doctor>(`https://localhost:7012/Doctors/${profileId}`, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//         "Access-Control-Allow-Origin" : "*"
//       }
//     });

//     const statusCode = response.status;
//     if (statusCode===403) {
//      return rejectWithValue("Forbidden")
//     }
//     if (!response.data) {
//       throw new Error();
//     }
//     return response.data;
//   } catch (e) {
//     console.log(e);
//     return rejectWithValue("error");
//   }
// });
export const fetchPatientData = createAsyncThunk<
    PatientProfileSchema,
    string,
    ThunkConfig<string>
>('profile/fetchPatientData', async (profileId, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;
    const isAdmin = useSelector(isUserAdmin);
    const isPatient = useSelector(isUserPatient);
    const isDoctor = useSelector(isUserDoctor);

    try {
        if (isAdmin) {
            const response = await extra.api.get<AdminProfileSchema>(
                `http://localhost:5015/Administrators/${profileId}`,
            );
            const statusCode = response.status;
            if (statusCode === 403) {
                return rejectWithValue('Forbidden');
            }
            if (!response.data) {
                throw new Error();
            }
            return response.data;
        }
        if (isPatient) {
            const response = await extra.api.get<PatientProfileSchema>(
                `http://localhost:5015/Patients/${profileId}`,
            );
            const statusCode = response.status;
            if (statusCode === 403) {
                return rejectWithValue('Forbidden');
            }
            if (!response.data) {
                throw new Error();
            }
            return response.data;
        }
        if (isDoctor) {
            const response = await extra.api.get<DoctorProfileSchema>(
                `http://localhost:5015/Doctors/${profileId}`,
            );
            const statusCode = response.status;
            if (statusCode === 403) {
                return rejectWithValue('Forbidden');
            }
            if (!response.data) {
                throw new Error();
            }
            return response.data;
        }
        throw new Error();
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});
