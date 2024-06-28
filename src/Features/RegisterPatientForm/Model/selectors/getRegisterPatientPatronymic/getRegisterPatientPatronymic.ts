import { type StateSchema } from "@/App/Providers/StoreProvider";

export const getRegisterPatientPatronymic = (state: StateSchema) =>
  state?.registerPatientSchema?.patronymic || "";
