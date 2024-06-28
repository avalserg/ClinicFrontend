import { StateSchema } from "@/App/Providers/StoreProvider";

export const getProfileError = (state: StateSchema) =>
  state?.profile?.error || "";
