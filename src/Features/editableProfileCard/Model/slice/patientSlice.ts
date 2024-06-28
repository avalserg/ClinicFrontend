// import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// import {  fetchPatientData} from "../services/fetchProfileData/fetchProfileData";
// import { PatientProfileSchema} from "../types/editableProfileCardSchema";
// import { Patient } from "@/Entities/Patient";


// const initialState: PatientProfileSchema = {
//   readonly: true,
//   isLoading: false,
//   error: undefined,
//   data: undefined,
// };

// export const patientSlice = createSlice({
//   name: "profile",
//   initialState,
//   reducers: {
//     setReadonly: (state, action: PayloadAction<boolean>) => {
//       state.readonly = action.payload;
//     },
//     // reset inputs
//     cancelEdit: (state) => {
//       state.readonly = true;
//       state.validateErrors = undefined;
//       state.form = state.data;
//     },
//     // update all data from State
//     updateProfile: (state, action: PayloadAction<Patient>) => {
//       state.form = {
//         ...state.form,
//         ...action.payload,
//       };
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchPatientData.pending, (state) => {
//         state.error = undefined;

//         state.isLoading = true;
//       })
//       .addCase(
//         fetchPatientData.fulfilled,
//         (state, action: PayloadAction<Patient>) => {
//           state.isLoading = false;

//           state.data = action.payload;
//           state.form = action.payload;
//         },
//       )
//       .addCase(fetchPatientData.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload;
//       });
          
//       // .addCase(updateProfileData.pending, (state) => {
//       //   state.validateErrors = undefined;
//       //   state.isLoading = true;
//       // })
//       // .addCase(
//       //   updateProfileData.fulfilled,
//       //   (state, action: PayloadAction<Profile>) => {
//       //     state.isLoading = false;

//       //     state.data = action.payload;
//       //     state.form = action.payload;
//       //     // after editing return in readoly state
//       //     state.readonly = true;
//       //     state.validateErrors = undefined;
//       //   },
//       // )
//       // .addCase(updateProfileData.rejected, (state, action) => {
//       //   state.isLoading = false;
//       //   state.validateErrors = action.payload;
//       // });
//   },
// });

// // Action creators are generated for each case reducer function
// export const { actions: patientActions } = patientSlice;
// export const { reducer: patientReducer } = patientSlice;
