import { type StateSchema } from "@/App/Providers/StoreProvider";

export const getRegisterPatientPassword = (state: StateSchema) =>
  state?.registerPatientSchema?.password || "";
