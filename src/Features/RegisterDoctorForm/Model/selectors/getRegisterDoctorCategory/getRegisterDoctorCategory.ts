import { StateSchema } from "@/App/Providers/StoreProvider";

export const getRegisterDoctorCategory = (state: StateSchema) =>
    state?.registerDoctor?.category || undefined;
