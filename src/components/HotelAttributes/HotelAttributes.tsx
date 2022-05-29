import React from 'react';
import { IHotelHostFront } from 'types/hotel.types';

import { HotelHost } from 'components/HotelHost';
import { HotelReviews } from 'components/HotelReviews';

interface IHotelAttributesProps {
    isPremium: boolean;
    title: string;
    rating: number;
    type: string;
    bedrooms: number;
    maxAdults: number;
    goods: string[];
    price: number;
    host: IHotelHostFront;
    description: string;
}

export const HotelAttributes: React.FC<IHotelAttributesProps> = ({
    isPremium,
    title,
    rating,
    type,
    bedrooms,
    maxAdults,
    goods,
    price,
    host,
    description,
}) => {
    return (
        <div className="property__container container">
            <div className="property__wrapper">
                {isPremium && (
                    <div className="property__mark">
                        <span>Premium</span>
                    </div>
                )}
                <div className="property__name-wrapper">
                    <h1 className="property__name">{title}</h1>
                    <button className="property__bookmark-button button" type="button">
                        <svg className="property__bookmark-icon" width="31" height="33">
                            <use xlinkHref="#icon-bookmark" />
                        </svg>
                        <span className="visually-hidden">To bookmarks</span>
                    </button>
                </div>
                <div className="property__rating rating">
                    <div className="property__stars rating__stars">
                        <span style={{ width: `${Math.round(rating) * 20}%` }} />
                        <span className="visually-hidden">Rating</span>
                    </div>
                    <span className="property__rating-value rating__value">{rating}</span>
                </div>
                <ul className="property__features">
                    <li className="property__feature property__feature--entire">{type}</li>
                    <li className="property__feature property__feature--bedrooms">
                        {`${bedrooms} Bedrooms`}
                    </li>
                    <li className="property__feature property__feature--adults">
                        {`Max ${maxAdults} adults`}
                    </li>
                </ul>
                <div className="property__price">
                    <b className="property__price-value">&euro;{price}</b>
                    <span className="property__price-text">&nbsp;night</span>
                </div>
                <div className="property__inside">
                    <h2 className="property__inside-title">What&apos;s inside</h2>
                    <ul className="property__inside-list">
                        {goods?.map((good) => (
                            <li className="property__inside-item" key={good}>
                                {good}
                            </li>
                        ))}
                    </ul>
                </div>
                <HotelHost host={host} description={description} />
                <HotelReviews />
            </div>
        </div>
    );
};
