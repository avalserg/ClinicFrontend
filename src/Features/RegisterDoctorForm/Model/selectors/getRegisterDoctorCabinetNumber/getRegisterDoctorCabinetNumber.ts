import { StateSchema } from "@/App/Providers/StoreProvider";

export const getRegisterDoctorCabinetNumber = (state: StateSchema) =>
    state?.registerDoctor?.cabinetNumber || "";
