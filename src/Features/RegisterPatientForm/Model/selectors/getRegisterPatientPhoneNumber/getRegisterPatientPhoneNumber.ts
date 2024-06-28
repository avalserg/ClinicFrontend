import { type StateSchema } from "@/App/Providers/StoreProvider";

export const getRegisterPatientPhoneNumber = (state: StateSchema) =>
  state?.registerPatientSchema?.phoneNumber || "";
