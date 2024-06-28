import { type StateSchema } from "@/App/Providers/StoreProvider";

export const getRegisterDoctorIsLoading = (state: StateSchema) =>
  state?.registerDoctor?.isLoading || false;
