import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from 'constants/AppRoute';
import { QueryParam } from 'constants/QueryParam';
import { useQuery } from 'hooks/useQuery';
import { IHotelFront } from 'types/hotel.types';

import { FavoritesListCard } from 'components/FavoritesListCard';

interface IFavoritesListProps {
    favorites: Record<string, IHotelFront[]>;
}

export const FavoritesList: React.FC<IFavoritesListProps> = ({ favorites }) => {
    const query = useQuery();
    const navigate = useNavigate();

    const handleLinkClick = useCallback(
        (cityName: string) => {
            query.set(QueryParam.City, cityName);
            navigate({
                pathname: AppRoute.Home(),
                search: query.toString(),
            });
        },
        [query, navigate],
    );

    return (
        <ul className="favorites__list">
            {Object.keys(favorites)
                .sort()
                .map((cityName) => (
                    <li className="favorites__locations-items" key={cityName}>
                        <div className="favorites__locations locations locations--current">
                            <div className="locations__item">
                                <span
                                    className="locations__item-link"
                                    onClick={() => handleLinkClick(cityName)}
                                >
                                    <span>{cityName}</span>
                                </span>
                            </div>
                        </div>
                        <div className="favorites__places">
                            {favorites[`${cityName}`].map(
                                ({
                                    id,
                                    isPremium,
                                    rating,
                                    type,
                                    title,
                                    price,
                                    previewImage,
                                    isFavorite,
                                }) => (
                                    <FavoritesListCard
                                        key={id}
                                        id={id}
                                        isPremium={isPremium}
                                        rating={rating}
                                        type={type}
                                        title={title}
                                        price={price}
                                        previewImage={previewImage}
                                        isFavorite={isFavorite}
                                    />
                                ),
                            )}
                        </div>
                    </li>
                ))}
        </ul>
    );
};
