import { type StateSchema } from "@/App/Providers/StoreProvider";

export const getRegisterDoctorPhoneNumber = (state: StateSchema) =>
  state?.registerDoctor?.phoneNumber || "";
