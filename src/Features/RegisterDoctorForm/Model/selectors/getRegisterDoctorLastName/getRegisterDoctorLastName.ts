import { type StateSchema } from "@/App/Providers/StoreProvider";

export const getRegisterDoctorLastName = (state: StateSchema) =>
  state?.registerDoctor?.lastName || "";
