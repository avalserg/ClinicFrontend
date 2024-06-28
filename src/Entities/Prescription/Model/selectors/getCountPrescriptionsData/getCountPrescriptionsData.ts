import { StateSchema } from '@/App/Providers/StoreProvider';

export const getCountPrescriptionsData = (state: StateSchema) =>
    state?.countPrescriptions?.count || undefined;
