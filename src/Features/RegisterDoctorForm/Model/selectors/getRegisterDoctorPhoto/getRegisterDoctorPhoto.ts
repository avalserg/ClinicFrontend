import { type StateSchema } from "@/App/Providers/StoreProvider";

export const getRegisterDoctorPhoto = (state: StateSchema) =>
  state?.registerDoctor?.photo || "";
