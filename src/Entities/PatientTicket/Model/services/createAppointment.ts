// export const createAppointment = createAsyncThunk<
//     Appointment,
//     CreateAppointmentSchema,
//     // ThunkConfig<ValidateCreateReviewError[]>
//     ThunkConfig<string>
// >('patientTicketsPage/createAppointment', async (props, thunkApi) => {
//     const { extra, rejectWithValue, getState } = thunkApi;

//     // const patientId = getUserAuthData(getState())?.applicationUserId;

//     // const description = getReviewDescription(getState());
//     try {
//         const response = await extra.api.post<CreateAppointmentSchema>(
//             `http://localhost:5270/Reviews`,
//             {
//                 patientId,
//                 description,
//             },
//         );
//         if (!response.data) {
//             throw new Error();
//         }
//         return response.data;
//     } catch (e) {
//         return rejectWithValue("");
//     }
// });
