import { type StateSchema } from "@/App/Providers/StoreProvider";

export const getLoginUsername = (state: StateSchema) =>
  state?.loginForm?.login || "";
