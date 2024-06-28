import { type StateSchema } from "@/App/Providers/StoreProvider";

export const getUserAuthData = (state: StateSchema) => state.applicationUser.authData;
