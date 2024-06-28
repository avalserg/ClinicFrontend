import { StateSchema } from '@/App/Providers/StoreProvider';

export const getCountDoctorsByCategoryData = (state: StateSchema) =>
    state?.countDoctorsByCategory?.value || undefined;
