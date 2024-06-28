import { createAsyncThunk } from "@reduxjs/toolkit";
import { Prescription } from "../types/prescription";
import { ThunkConfig } from "@/App/Providers/StoreProvider";

export const fetchPrescriptionById = createAsyncThunk<
    Prescription,
    string|undefined,
    ThunkConfig<string>
>('prescription/fetchCountPrescriptionById', async (prescriptionId, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.get<Prescription>(
            `http://localhost:5079/Prescription/${prescriptionId}`,
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
