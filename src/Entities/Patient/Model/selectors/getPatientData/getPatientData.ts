import { type StateSchema } from "@/App/Providers/StoreProvider";

export const getPatientData = (state: StateSchema) => state.patient?.data;
