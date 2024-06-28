import { StateSchema } from "@/App/Providers/StoreProvider";

export const getProfileValidateErrors = (state: StateSchema) =>
  state.profile?.validateErrors;
