import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoute } from 'constants/AppRoute';
import { selectFavoritesByCities } from 'store/selectors/hotels-selectors';
import { useAppDispatch } from 'store/store';
import { requestFavoritesThunkAction } from 'store/thunk-actions/favorites-thunk-actions';

import { FavoritesListCard } from 'components/FavoritesListCard';

export const FavoritesList: React.FC = () => {
    const dispatch = useAppDispatch();
    const favorites = useSelector(selectFavoritesByCities);

    useEffect(() => {
        void dispatch(requestFavoritesThunkAction());
    }, [dispatch]);

    return (
        <ul className="favorites__list">
            {Object.keys(favorites)
                .sort()
                .map((cityName) => (
                    <li className="favorites__locations-items" key={cityName}>
                        <div className="favorites__locations locations locations--current">
                            <div className="locations__item">
                                <Link className="locations__item-link" to={AppRoute.Home()}>
                                    <span>{cityName}</span>
                                </Link>
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
