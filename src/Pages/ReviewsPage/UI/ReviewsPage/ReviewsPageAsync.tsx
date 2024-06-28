import { lazy } from 'react';

// separate chunk
export const ReviewsPageAsync = lazy(async () => await import('./ReviewsPage'));
