import React, { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppRoute } from 'constants/AppRoute';
import { FavoriteStatus } from 'constants/FavoriteStatus';
import { FetchStatus } from 'constants/FetchStatus';
import { Notification } from 'constants/Notification';
import { selectFavoritesPostFetchStatus } from 'store/selectors/hotels-selectors';
import { selectUserEmail } from 'store/selectors/user-selectors';
import { useAppDispatch } from 'store/store';
import { postFavoriteThunkAction } from 'store/thunk-actions/favorites-thunk-actions';

import { notifyInfo } from 'utils/toasts';

interface IButtonBookmarkProps {
    width: number;
    height: number;
    isFavorite: boolean;
    customClassName: string;
    svgClassName: string;
    hotelId: string;
}

export const ButtonBookmark: React.FC<IButtonBookmarkProps> = ({
    width,
    height,
    isFavorite,
    customClassName,
    svgClassName,
    hotelId,
}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isLoggedIn = !!useSelector(selectUserEmail);
    const location = useLocation();
    const favoritesPostFetchStatus = useSelector(selectFavoritesPostFetchStatus);

    const isPosting = useMemo(
        () => favoritesPostFetchStatus === FetchStatus.Fetching,
        [favoritesPostFetchStatus],
    );

    const handleButtonClick = useCallback(() => {
        if (!isLoggedIn) {
            notifyInfo(Notification.PleaseSignIn);
            return navigate(AppRoute.Login(), { state: { from: location }, replace: true });
        }
        if (isFavorite) {
            void dispatch(postFavoriteThunkAction({ id: hotelId, status: FavoriteStatus.Remove }));
        }
        if (!isFavorite) {
            void dispatch(postFavoriteThunkAction({ id: hotelId, status: FavoriteStatus.Add }));
        }
    }, [dispatch, navigate, isLoggedIn, location, hotelId, isFavorite]);

    return (
        <button
            className={`button ${customClassName ? customClassName : ''}`}
            type="button"
            onClick={handleButtonClick}
            disabled={isPosting}
        >
            <svg
                className={svgClassName}
                width={width}
                height={height}
                style={isFavorite ? { fill: '#4481c3', stroke: '#4481c3' } : {}}
            >
                <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">To bookmarks</span>
        </button>
    );
};
