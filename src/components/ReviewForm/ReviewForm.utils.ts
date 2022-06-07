import { ErrorMessage } from 'constants/ErrorMessage';
import { IReviewFormValues } from 'types/comment.types';

export type ReviewFormErrorsType = Record<keyof IReviewFormValues, ErrorMessage | undefined>;

export const validateReviewForm = (values: IReviewFormValues): ReviewFormErrorsType => {
    const errors = {} as ReviewFormErrorsType;
    const { comment, rating } = values;

    if (!rating) {
        errors.rating = ErrorMessage.RatingRequired;
    }

    if (!comment || comment?.length < 50) {
        errors.comment = ErrorMessage.MinCommentLength;
    }

    if (comment?.length > 300) {
        errors.comment = ErrorMessage.MaxCommentLength;
    }

    return errors;
};
