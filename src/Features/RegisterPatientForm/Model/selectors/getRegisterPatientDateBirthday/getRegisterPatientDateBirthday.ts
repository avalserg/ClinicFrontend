import { type StateSchema } from "@/App/Providers/StoreProvider";

export const getRegisterPatientDateBirthday = (state: StateSchema) =>
  state?.registerPatientSchema?.dateBirthday || undefined;
