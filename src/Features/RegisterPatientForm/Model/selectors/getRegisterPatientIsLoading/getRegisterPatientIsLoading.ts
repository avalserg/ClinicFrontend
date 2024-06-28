import { type StateSchema } from "@/App/Providers/StoreProvider";

export const getRegisterPatientIsLoading = (state: StateSchema) =>
  state?.registerPatientSchema?.isLoading || false;
