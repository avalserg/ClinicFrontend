import { type StateSchema } from "@/App/Providers/StoreProvider";

export const getRegisterPatientAddress = (state: StateSchema) =>
  state?.registerPatientSchema?.address || "";
