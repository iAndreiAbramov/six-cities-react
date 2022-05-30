import React from 'react';
import { Field } from 'react-final-form';
import { DEFAULT_CHECKED_RATING } from 'constants/common';
import { RatingType } from 'types/comment.types';

import { getRatingTitle } from 'utils/common';

interface IStarProps {
    value: RatingType;
}

export const Star: React.FC<IStarProps> = ({ value }) => {
    return (
        <Field name="rating">
            {({ input }) => (
                <>
                    <input
                        {...input}
                        className="form__rating-input visually-hidden"
                        id={`${value}-stars`}
                        type="radio"
                        value={value}
                        defaultChecked={value === DEFAULT_CHECKED_RATING}
                    />
                    <label
                        htmlFor={`${value}-stars`}
                        className="reviews__rating-label form__rating-label"
                        title={getRatingTitle(value)}
                    >
                        <svg className="form__star-image" width="37" height="33">
                            <use xlinkHref="#icon-star" />
                        </svg>
                    </label>
                </>
            )}
        </Field>
    );
};
