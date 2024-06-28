import { type StateSchema } from "@/App/Providers/StoreProvider";

export const getRegisterDoctorFirstName = (state: StateSchema) =>
  state?.registerDoctor?.firstName || "";
