import React, { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { MAX_RATING } from 'constants/common';
import { selectComments } from 'store/selectors/hotel-selectors';
import { IReviewFormValues } from 'types/comment.types';

import { ReviewForm } from 'components/ReviewForm';
import { getDateForComment, getDateTimeForComment, getPreparedComments } from 'utils/common';

export const HotelReviews: React.FC = () => {
    const commentsData = useSelector(selectComments);

    const preparedComments = useMemo(() => getPreparedComments(commentsData), [commentsData]);

    const handleFormSubmit = useCallback((values: IReviewFormValues) => {
        alert(values);
    }, []);

    return (
        <section className="property__reviews reviews">
            <h2 className="reviews__title">
                {commentsData.length > 0 ? (
                    <>
                        Reviews &middot;
                        <span className="reviews__amount">{commentsData.length}</span>
                    </>
                ) : (
                    <>There is no reviews yet</>
                )}
            </h2>
            {commentsData?.length > 0 && (
                <>
                    <ul className="reviews__list">
                        {preparedComments.map(({ user, rating, comment, id, date }) => (
                            <li className="reviews__item" key={id}>
                                <div className="reviews__user user">
                                    <div className="reviews__avatar-wrapper user__avatar-wrapper">
                                        <img
                                            className="reviews__avatar user__avatar"
                                            src={user.avatarUrl}
                                            width="54"
                                            height="54"
                                            alt="Reviews avatar"
                                        />
                                    </div>
                                    <span className="reviews__user-name">Max</span>
                                </div>
                                <div className="reviews__info">
                                    <div className="reviews__rating rating">
                                        <div className="reviews__stars rating__stars">
                                            <span
                                                style={{
                                                    width: `${Math.round(rating) * MAX_RATING}%`,
                                                }}
                                            />
                                            <span className="visually-hidden">Rating</span>
                                        </div>
                                    </div>
                                    <p className="reviews__text">{comment}</p>
                                    <time
                                        className="reviews__time"
                                        dateTime={getDateTimeForComment(date)}
                                    >
                                        {getDateForComment(date)}
                                    </time>
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            )}

            <ReviewForm handleFormSubmit={handleFormSubmit} />
        </section>
    );
};
