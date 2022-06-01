import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from 'constants/AppRoute';
import { MAX_RATING } from 'constants/common';

import { ButtonBookmark } from 'components/ButtonBookmark';

interface IHotelsListCardProps {
    id: number;
    isPremium: boolean;
    rating: number;
    type: string;
    title: string;
    price: number;
    previewImage: string;
    handleActiveHotelIdChange: (hotelId: number) => void;
    isFavorite: boolean;
}

export const HotelsListCard: React.FC<IHotelsListCardProps> = ({
    id,
    previewImage,
    title,
    price,
    rating,
    isPremium,
    type,
    handleActiveHotelIdChange,
    isFavorite,
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
                    <ButtonBookmark
                        width={18}
                        height={19}
                        svgClassName="place-card__bookmark-icon"
                        isFavorite={isFavorite}
                        customClassName="place-card__bookmark-button"
                        hotelId={String(id)}
                    />
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
