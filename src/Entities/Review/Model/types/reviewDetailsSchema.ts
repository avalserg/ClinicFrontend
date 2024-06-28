import {Review } from './review';

export interface ReviewDetailsSchema {
    isLoading: boolean;
    error?: string;
    data?: Review;
}
