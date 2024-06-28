import { StateSchema } from "@/App/Providers/StoreProvider";

export const getRegisterPatientValidateErrors = (state: StateSchema) =>
  state.registerPatientSchema?.validateErrors;
