import { type StateSchema } from "@/App/Providers/StoreProvider";

export const getRegisterPatientLastName = (state: StateSchema) =>
  state?.registerPatientSchema?.lastName || "";
