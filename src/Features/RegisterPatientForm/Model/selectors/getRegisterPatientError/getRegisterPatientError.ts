import { type StateSchema } from "@/App/Providers/StoreProvider";

export const getRegisterPatientError = (state: StateSchema) => state?.registerPatientSchema?.error;
