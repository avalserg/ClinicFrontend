import { type StateSchema } from "@/App/Providers/StoreProvider";

export const getRegisterDoctorAddress = (state: StateSchema) =>
    state?.registerDoctor?.address || '';
