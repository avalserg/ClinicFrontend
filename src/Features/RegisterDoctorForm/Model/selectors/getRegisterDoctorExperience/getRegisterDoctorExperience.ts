import { StateSchema } from "@/App/Providers/StoreProvider";

export const getRegisterDoctorExperience = (state: StateSchema) =>
    state?.registerDoctor?.experience || undefined;
