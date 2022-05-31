import { IReviewFormValues } from 'types/comment.types';

export type ReviewFormErrorsType = Record<keyof IReviewFormValues, string | undefined>;

export const validateReviewForm = (values: IReviewFormValues): ReviewFormErrorsType => {
    const errors = {} as ReviewFormErrorsType;
    const { comment, rating } = values;

    if (!rating) {
        errors.rating = 'Rating is required';
    }

    if (!comment || comment?.length < 50) {
        errors.comment = 'Minimum comment length is 50 characters';
    }

    if (comment?.length > 300) {
        errors.comment = 'Maximum comment length is 300 characters';
    }

    return errors;
};
