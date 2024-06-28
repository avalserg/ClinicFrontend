import { StateSchema } from "@/App/Providers/StoreProvider";

export const getProfileReadonly = (state: StateSchema) =>
  state?.profile?.readonly;
