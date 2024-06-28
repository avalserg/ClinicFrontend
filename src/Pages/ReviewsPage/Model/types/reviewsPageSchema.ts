import { Review } from '@/Entities/Review';
import { ValidateCreateReviewError } from '../consts/consts';

interface ReviewListData {
    items: Review[];
    // totalCount: number;
}

export interface ReviewsPageSchema {
    isLoading?: boolean;
    error?: string;
    data?: ReviewListData;
}

export interface CreateReviewSchema {
    isLoading?: boolean;
    error?: ValidateCreateReviewError[];
    description?: string;
}
