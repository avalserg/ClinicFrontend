import { type StateSchema } from "@/App/Providers/StoreProvider";

export const getRegisterDoctorDateBirthday = (state: StateSchema) =>
  state?.registerDoctor?.dateBirthday || undefined;
