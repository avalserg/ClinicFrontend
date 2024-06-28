import { StateSchema } from '@/App/Providers/StoreProvider';

export const getPrescriptionByIdData = (state: StateSchema) =>
    state?.prescription?.data || undefined;
