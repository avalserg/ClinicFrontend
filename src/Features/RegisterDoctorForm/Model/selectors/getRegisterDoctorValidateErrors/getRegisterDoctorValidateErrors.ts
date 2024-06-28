import { StateSchema } from "@/App/Providers/StoreProvider";

export const getRegisterDoctorValidateErrors = (state: StateSchema) =>
  state.registerDoctor?.validateErrors;
