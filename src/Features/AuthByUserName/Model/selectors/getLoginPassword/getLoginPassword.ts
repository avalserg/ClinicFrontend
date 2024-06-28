import { type StateSchema } from "@/App/Providers/StoreProvider";

export const getLoginPassword = (state: StateSchema) =>
  state?.loginForm?.password || "";
