import { type StateSchema } from "@/App/Providers/StoreProvider";

export const getRegisterDoctorLogin = (state: StateSchema) =>
  state?.registerDoctor?.login || "";
