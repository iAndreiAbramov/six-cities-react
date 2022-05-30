import { MAX_RATING } from 'constants/common';

import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectComments } from 'store/selectors/hotel-selectors';

import { getDateForComment, getDateTimeForComment, getPreparedComments } from 'utils/common';

export const HotelReviews: React.FC = () => {
    const commentsData = useSelector(selectComments);

    const preparedComments = useMemo(() => getPreparedComments(commentsData), [commentsData]);

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

            <form className="reviews__form form" action="#" method="post">
                <label className="reviews__label form__label" htmlFor="review">
                    Your review
                </label>
                <div className="reviews__rating-form form__rating">
                    <input
                        className="form__rating-input visually-hidden"
                        name="rating"
                        value="5"
                        id="5-stars"
                        type="radio"
                    />
                    <label
                        htmlFor="5-stars"
                        className="reviews__rating-label form__rating-label"
                        title="perfect"
                    >
                        <svg className="form__star-image" width="37" height="33">
                            <use xlinkHref="#icon-star" />
                        </svg>
                    </label>

                    <input
                        className="form__rating-input visually-hidden"
                        name="rating"
                        value="4"
                        id="4-stars"
                        type="radio"
                    />
                    <label
                        htmlFor="4-stars"
                        className="reviews__rating-label form__rating-label"
                        title="good"
                    >
                        <svg className="form__star-image" width="37" height="33">
                            <use xlinkHref="#icon-star"></use>
                        </svg>
                    </label>

                    <input
                        className="form__rating-input visually-hidden"
                        name="rating"
                        value="3"
                        id="3-stars"
                        type="radio"
                    />
                    <label
                        htmlFor="3-stars"
                        className="reviews__rating-label form__rating-label"
                        title="not bad"
                    >
                        <svg className="form__star-image" width="37" height="33">
                            <use xlinkHref="#icon-star"></use>
                        </svg>
                    </label>

                    <input
                        className="form__rating-input visually-hidden"
                        name="rating"
                        value="2"
                        id="2-stars"
                        type="radio"
                    />
                    <label
                        htmlFor="2-stars"
                        className="reviews__rating-label form__rating-label"
                        title="badly"
                    >
                        <svg className="form__star-image" width="37" height="33">
                            <use xlinkHref="#icon-star"></use>
                        </svg>
                    </label>

                    <input
                        className="form__rating-input visually-hidden"
                        name="rating"
                        value="1"
                        id="1-star"
                        type="radio"
                    />
                    <label
                        htmlFor="1-star"
                        className="reviews__rating-label form__rating-label"
                        title="terribly"
                    >
                        <svg className="form__star-image" width="37" height="33">
                            <use xlinkHref="#icon-star"></use>
                        </svg>
                    </label>
                </div>
                <textarea
                    className="reviews__textarea form__textarea"
                    id="review"
                    name="review"
                    placeholder="Tell how was your stay, what you like and what can be improved"
                />
                <div className="reviews__button-wrapper">
                    <p className="reviews__help">
                        To submit review please make sure to set
                        <span className="reviews__star">rating</span> and describe your stay with at
                        least <b className="reviews__text-amount">50 characters</b>.
                    </p>
                    <button className="reviews__submit form__submit button" type="submit" disabled>
                        Submit
                    </button>
                </div>
            </form>
        </section>
    );
};
