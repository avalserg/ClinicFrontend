// import { PayloadAction, createSlice } from '@reduxjs/toolkit';
// import { Doctor } from '@/Entities/Doctor';
// import { fetchDoctorsList } from '../services/fetchDoctorsList';
// import { DoctorsPageSchema } from '../types/doctorPageSchema';
// import { createPatientTicket } from '../../../../Entities/PatientTicket/Model/services/createPatientTicket';
// import { PatientTicketSchema } from '@/Entities/PatientTicket/Model/types/patientTicket';
// import { updateDoctorData } from '../services/updateDoctor';
// import { fetchPatientTicketById } from '@/Entities/PatientTicket/Model/services/fetchPatientTicketById/fetchPatientTicketById';
// import { fetchBusyTimeForPatientTicketsByDate } from '../services/fetchBusyTimeForPatientTicketsByDate';

// const initialState: DoctorsPageBysyTimeSchema = {
//     isLoading: false,
//     error: undefined,
//     data: undefined,
// };

// const busyTimeForDoctorByDateSlice = createSlice({
//     name: 'busyTimeForDoctorByDateSlice',
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder

//             .addCase(fetchBusyTimeForPatientTicketsByDate.pending, (state) => {
//                 state.error = undefined;
//                 state.isLoading = true;
//             })
//             .addCase(
//                 fetchBusyTimeForPatientTicketsByDate.fulfilled,
//                 (state, action: PayloadAction<string[]>) => {
//                     state.isLoading = false;
//                     // @ts-ignore
//                     state.data?.items = action.payload;
//                 },
//             )
//             .addCase(
//                 fetchBusyTimeForPatientTicketsByDate.rejected,
//                 (state, action) => {
//                     state.isLoading = false;
//                     state.error = action.payload;
//                 },
//             );
//     },
// });

// export const { reducer: doctorPageReducer } = doctorPageSlice;
// export const { actions: doctorPageActions } = doctorPageSlice;
