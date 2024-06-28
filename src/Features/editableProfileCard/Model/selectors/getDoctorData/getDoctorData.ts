import { type StateSchema } from "@/App/Providers/StoreProvider";

export const getDoctorData = (state: StateSchema) => state.doctor?.data;
