import { type StateSchema } from "@/App/Providers/StoreProvider";

export const getRegisterDoctorPassword = (state: StateSchema) =>
  state?.registerDoctor?.password || "";
