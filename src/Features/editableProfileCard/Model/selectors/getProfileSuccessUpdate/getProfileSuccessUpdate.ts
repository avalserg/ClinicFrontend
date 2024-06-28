import { StateSchema } from "@/App/Providers/StoreProvider";

export const getProfileSuccessUpdate = (state: StateSchema) =>
  state.profile?.isSuccessUpdate;
