import { type StateSchema } from "@/App/Providers/StoreProvider";

export const getLoginIsLoading = (state: StateSchema) =>
  state?.loginForm?.isLoading || false;
