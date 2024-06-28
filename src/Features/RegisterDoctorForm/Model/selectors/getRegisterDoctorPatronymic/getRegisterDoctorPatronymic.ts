import { type StateSchema } from "@/App/Providers/StoreProvider";

export const getRegisterDoctorPatronymic = (state: StateSchema) =>
  state?.registerDoctor?.patronymic || "";
