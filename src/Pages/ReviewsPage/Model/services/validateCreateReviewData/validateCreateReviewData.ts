import { ValidateCreateReviewError } from '../../consts/consts';
import { CreateReviewSchema } from '../../types/reviewsPageSchema';

export const validateCreateReview = (review?: CreateReviewSchema) => {
    if (!review) {
        return [ValidateCreateReviewError.NO_DATA];
    }
    const { description } = review;
    const errors: ValidateCreateReviewError[] = [];
    // if (description.length<10) {
    //     errors.push(ValidateCreateReviewError.INCORRECT_DESCRIPTION_LENGTH);
    // }

    return errors;
};
