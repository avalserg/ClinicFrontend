import { type StateSchema } from "@/App/Providers/StoreProvider";

export const getUserInited = (state: StateSchema) => state.applicationUser._inited;
