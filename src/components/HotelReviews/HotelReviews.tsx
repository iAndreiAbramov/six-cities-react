import React, { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { MAX_RATING } from 'constants/common';
import { resetCommentPostStateAction } from 'store/reducers/hotelReducer';
import {
    selectCommentPostError,
    selectCommentPostStatus,
    selectComments,
} from 'store/selectors/hotel-selectors';
import { selectUserEmail } from 'store/selectors/user-selectors';
import { useAppDispatch } from 'store/store';
import { postCommentThunkAction } from 'store/thunk-actions/hotel-thunk-actions';
import { IReviewFormValues } from 'types/comment.types';

import { ReviewForm } from 'components/ReviewForm';
import { getDateForComment, getDateTimeForComment, getPreparedComments } from 'utils/common';

interface IHotelReviewsProps {
    id: string | null;
}

export const HotelReviews: React.FC<IHotelReviewsProps> = ({ id }) => {
    const dispatch = useAppDispatch();
    const isLoggedIn = !!useSelector(selectUserEmail);
    const commentsData = useSelector(selectComments);
    const commentPostError = useSelector(selectCommentPostError);
    const commentPostStatus = useSelector(selectCommentPostStatus);

    const preparedComments = useMemo(() => getPreparedComments(commentsData), [commentsData]);

    const handleFormSubmit = useCallback(
        async (values: IReviewFormValues) => {
            if (id) {
                dispatch(resetCommentPostStateAction());
                return dispatch(postCommentThunkAction({ id, body: values }));
            }
        },
        [id, dispatch],
    );

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
                            <li className="reviews__item" data-testid="review" key={id}>
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
                                                    width: `${
                                                        (Math.round(rating) * 100) / MAX_RATING
                                                    }%`,
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
            {isLoggedIn && (
                <ReviewForm
                    handleFormSubmit={handleFormSubmit}
                    error={commentPostError}
                    commentPostStatus={commentPostStatus}
                />
            )}
        </section>
    );
};
