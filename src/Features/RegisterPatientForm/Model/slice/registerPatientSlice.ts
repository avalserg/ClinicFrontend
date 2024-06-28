import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RegisterPatientSchema } from "../types/registerPatientSchema";
import { createPatient } from "../services/createPatient/createPatient";


const initialState: RegisterPatientSchema = {
    login: "",
    password: "",
    firstName: "",
    lastName: "",
    patronymic: "",
    dateBirthday: undefined,
    address: "",
    phoneNumber: "",
    passport :"",
    isLoading: false
  
};

export const registerPatientSlice = createSlice({
  name: "registerPatient",
  initialState,
  reducers: {
    setPatientLogin: (state, action: PayloadAction<string>) => {
      state.login = action.payload;
    },
    setPatientPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setPatientFirstName: (state, action: PayloadAction<string>) => {
      state.firstName = action.payload;
    },
    setPatientLastName: (state, action: PayloadAction<string>) => {
      state.lastName = action.payload;
    },
    setPatientPatronymic: (state, action: PayloadAction<string>) => {
      state.patronymic = action.payload;
    },
    setPatientDateBirthDay: (state, action: PayloadAction<string>) => {
      state.dateBirthday = action.payload;
    },
    setPatientAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
    },
    setPatientPhoneNumber: (state, action: PayloadAction<string>) => {
      state.phoneNumber = action.payload;
    },
    setPatientPassport: (state, action: PayloadAction<string>) => {
      state.passport = action.payload;
    },
  },
  // to change State for async three states pending fulfilled  rejected
  extraReducers: (builder) => {
    builder
      .addCase(createPatient.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(createPatient.fulfilled, (state, action:PayloadAction<RegisterPatientSchema>) => {
          state.isLoading = false;
          
      })
      .addCase(createPatient.rejected, (state, action) => {
        state.isLoading = false;
        // from server
        if ( typeof(action.payload)=== "string") {
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
export const { actions: registerPatientActions } = registerPatientSlice;
export const { reducer: registerPatientReducer } = registerPatientSlice;
