import { StateSchema } from "@/App/Providers/StoreProvider";

export const getProfileIsLoading = (state: StateSchema) =>
  state?.profile?.isLoading;
