import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RegisterDoctorSchema } from '../types/registerDoctorSchema';
import { registerDoctor } from '../services/registerDoctor/registerDoctor';
import { DoctorCategory } from '@/Entities/DoctorCategory';

const initialState: RegisterDoctorSchema = {
    login: '',
    password: '',
    firstName: '',
    lastName: '',
    patronymic: '',
    dateBirthday: undefined,
    address: '',
    phoneNumber: '',
    cabinetNumber: '',
    category: DoctorCategory.Первая,
    isLoading: false,
    speciality: '',
    experience: undefined,
    validateErrors: undefined,
};

export const registerDoctorSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setDoctorLogin: (state, action: PayloadAction<string>) => {
            state.login = action.payload;
        },
        setDoctorPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
        setDoctorFirstName: (state, action: PayloadAction<string>) => {
            state.firstName = action.payload;
        },
        setDoctorLastName: (state, action: PayloadAction<string>) => {
            state.lastName = action.payload;
        },
        setDoctorPatronymic: (state, action: PayloadAction<string>) => {
            state.patronymic = action.payload;
        },
        setDoctorDateBirthDay: (state, action: PayloadAction<string>) => {
            state.dateBirthday = action.payload;
        },
        setDoctorAddress: (state, action: PayloadAction<string>) => {
            state.address = action.payload;
        },
        setDoctorPhoneNumber: (state, action: PayloadAction<string>) => {
            state.phoneNumber = action.payload;
        },
        setDoctorCabinetNumber: (state, action: PayloadAction<string>) => {
            state.cabinetNumber = action.payload;
        },
        setDoctorCategory: (state, action: PayloadAction<DoctorCategory>) => {
            state.category = action.payload;
        },
        setDoctorSpeciality: (state, action: PayloadAction<string>) => {
            state.speciality = action.payload;
        },
        setDoctorExperience: (state, action: PayloadAction<string>) => {
            state.experience = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerDoctor.pending, (state) => {
                state.error = undefined;

                state.isLoading = true;
            })
            .addCase(
                registerDoctor.fulfilled,
                (state, action: PayloadAction<RegisterDoctorSchema>) => {
                    state.isLoading = false;
                },
            )
            .addCase(registerDoctor.rejected, (state, action) => {
                state.isLoading = false;
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
export const { actions: registerDoctorActions } = registerDoctorSlice;
export const { reducer: registerDoctorReducer } = registerDoctorSlice;
