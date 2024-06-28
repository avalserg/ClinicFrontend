import { lazy } from 'react';

// separate chunk
export const PatientPageAsync = lazy(async () => await import('./PatientPage'));
