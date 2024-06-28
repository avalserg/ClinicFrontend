import { type StateSchema } from "@/App/Providers/StoreProvider";

export const getRegisterPatientFirstName = (state: StateSchema) =>
  state?.registerPatientSchema?.firstName || "";
