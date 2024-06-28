import { type StateSchema } from "@/App/Providers/StoreProvider";

export const getLoginError = (state: StateSchema) => state?.loginForm?.error;
