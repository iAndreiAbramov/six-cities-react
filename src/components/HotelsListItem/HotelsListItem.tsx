import { AppRoute } from 'constants/AppRoute';
import { MAX_RATING } from 'constants/common';

import React from 'react';
import { Link } from 'react-router-dom';

interface IHotelsListItemProps {
    id: number;
    isPremium: boolean;
    rating: number;
    type: string;
    title: string;
    price: number;
    previewImage: string;
    handleActiveHotelIdChange: (hotelId: number) => void;
}

export const HotelsListItem: React.FC<IHotelsListItemProps> = ({
    id,
    previewImage,
    title,
    price,
    rating,
    isPremium,
    type,
    handleActiveHotelIdChange,
}) => {
    return (
        <article
            className="cities__place-card place-card"
            onMouseEnter={() => handleActiveHotelIdChange(id)}
        >
            {isPremium && (
                <div className="place-card__mark">
                    <span>Premium</span>
                </div>
            )}
            <div className="cities__image-wrapper place-card__image-wrapper">
                <Link to={AppRoute.Hotel(String(id))}>
                    <img
                        className="place-card__image"
                        src={previewImage}
                        width="260"
                        height="200"
                        alt="Place image"
                    />
                </Link>
            </div>
            <div className="place-card__info">
                <div className="place-card__price-wrapper">
                    <div className="place-card__price">
                        <b className="place-card__price-value">&euro;{price}</b>
                        <span className="place-card__price-text">&#47;&nbsp;night</span>
                    </div>
                    <button className="place-card__bookmark-button button" type="button">
                        <svg className="place-card__bookmark-icon" width="18" height="19">
                            <use xlinkHref="#icon-bookmark" />
                        </svg>
                        <span className="visually-hidden">To bookmarks</span>
                    </button>
                </div>
                <div className="place-card__rating rating">
                    <div className="place-card__stars rating__stars">
                        <span style={{ width: `${Math.round((MAX_RATING * 100) / rating)}%` }} />
                        <span className="visually-hidden">Rating</span>
                    </div>
                </div>
                <h2 className="place-card__name">
                    <Link to={AppRoute.Hotel(String(id))}>{title}</Link>
                </h2>
                <p className="place-card__type">{type}</p>
            </div>
        </article>
    );
};
