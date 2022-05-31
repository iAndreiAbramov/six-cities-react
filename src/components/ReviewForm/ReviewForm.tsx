import React from 'react';
import { Field, Form } from 'react-final-form';
import { IReviewFormValues } from 'types/comment.types';

import { Star } from './components';
import { validateReviewForm } from './ReviewForm.utils';

interface IReviewFormProps {
    handleFormSubmit: (values: IReviewFormValues) => void;
    error?: string;
}

export const ReviewForm: React.FC<IReviewFormProps> = ({ handleFormSubmit, error }) => {
    return (
        <Form onSubmit={handleFormSubmit} validate={validateReviewForm}>
            {({
                handleSubmit,
                submitFailed,
                hasValidationErrors,
                dirtySinceLastSubmit,
                errors,
            }) => (
                <form
                    className={`reviews__form form ${
                        error || (submitFailed && !dirtySinceLastSubmit) ? 'shake' : ''
                    }`}
                    onSubmit={handleSubmit}
                >
                    <label className="reviews__label form__label" htmlFor="comment">
                        Your review
                    </label>
                    <div className="reviews__rating-form form__rating">
                        <Star value={5} />
                        <Star value={4} />
                        <Star value={3} />
                        <Star value={2} />
                        <Star value={1} />
                    </div>
                    <Field name="comment">
                        {({ input, meta }) => (
                            <textarea
                                {...input}
                                className="reviews__textarea form__textarea"
                                id="comment"
                                placeholder="Tell how was your stay, what you like and what can be improved"
                                style={
                                    submitFailed && meta.invalid && !meta.dirtySinceLastSubmit
                                        ? {
                                              outline: '1px solid red',
                                          }
                                        : {}
                                }
                            />
                        )}
                    </Field>
                    <div className="reviews__button-wrapper">
                        <p className="reviews__help">
                            To submit review please make sure to set
                            <span className="reviews__star">rating</span> and describe your stay
                            with at least <b className="reviews__text-amount">50 characters</b>.
                        </p>
                        <button
                            className="reviews__submit form__submit button"
                            type="submit"
                            disabled={hasValidationErrors && submitFailed}
                            style={hasValidationErrors && submitFailed ? { cursor: 'default' } : {}}
                        >
                            Submit
                        </button>
                    </div>
                    <div className="reviews__rating-form-error">
                        {submitFailed && (errors?.rating || errors?.comment)}
                    </div>
                </form>
            )}
        </Form>
    );
};