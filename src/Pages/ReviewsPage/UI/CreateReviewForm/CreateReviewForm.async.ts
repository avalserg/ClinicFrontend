import { type FC, lazy } from 'react';
import { type CreateReviewFormProps } from './CreateReviewForm';
// separate chunk
export const CreateReviewFormAsync = lazy<FC<CreateReviewFormProps>>(
    async () => await import('./CreateReviewForm'),
);
