
import { lazy } from 'react';

// separate chunk
export const AppointmentsPageAsync = lazy(
    async () => await import('../AppointmentsPage/AppointmentsPage'),
);
