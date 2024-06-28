import { type StateSchema } from "@/App/Providers/StoreProvider";

export const getRegisterPatientAvatar = (state: StateSchema) =>
  state?.registerPatientSchema?.avatar || "";
