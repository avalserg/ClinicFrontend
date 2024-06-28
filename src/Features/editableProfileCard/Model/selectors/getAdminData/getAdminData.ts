import { StateSchema } from '@/App/Providers/StoreProvider';

export const getAdminData = (state: StateSchema) => state.admin?.data;
