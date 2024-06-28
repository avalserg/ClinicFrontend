import { StateSchema } from '@/App/Providers/StoreProvider';

export const getProfileData = (state: StateSchema) => state?.profile?.data;
export const getDoctorProfileData = (state: StateSchema) =>
    state?.doctorProfile?.data;
