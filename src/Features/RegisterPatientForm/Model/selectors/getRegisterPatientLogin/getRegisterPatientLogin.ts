import { type StateSchema } from "@/App/Providers/StoreProvider";

export const getRegisterPatientLogin = (state: StateSchema) =>
  state?.registerPatientSchema?.login || "";
