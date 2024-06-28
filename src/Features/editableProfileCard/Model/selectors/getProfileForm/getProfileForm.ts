import { StateSchema } from '@/App/Providers/StoreProvider';

export const getProfileForm = (state: StateSchema) => state?.profile?.form;
export const getDoctorProfileForm = (state: StateSchema) =>
    state?.doctorProfile?.form;
export const getAdminProfileForm = (state: StateSchema) =>
    state?.adminProfile?.form;
