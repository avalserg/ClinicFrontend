import { type StateSchema } from "@/App/Providers/StoreProvider";

export const getRegisterPatientPassport = (state: StateSchema) =>
  state?.registerPatientSchema?.passport || "";