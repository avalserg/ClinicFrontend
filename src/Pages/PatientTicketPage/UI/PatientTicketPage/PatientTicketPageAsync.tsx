import { lazy } from 'react';

// separate chunk
export const PatientTicketPageAsync = lazy(
    async () => await import('./PatientTicketPage'),
);
