import { IReviewFormValues } from 'types/comment.types';

export type ReviewFormErrorsType = Record<keyof IReviewFormValues, string | undefined>;

export const validateReviewForm = (values: IReviewFormValues): ReviewFormErrorsType => {
    const errors = {} as ReviewFormErrorsType;
    const { comment } = values;

    if (!comment || comment.length === 0) {
        errors.comment = 'Comment required';
    }

    if (comment?.length < 50) {
        errors.comment = 'Minimum comment length is 50 chars';
    }

    if (comment?.length > 300) {
        errors.comment = 'Maximum comment length is 300 chars';
    }

    return errors;
};
