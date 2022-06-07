import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoute } from 'constants/AppRoute';
import { FetchStatus } from 'constants/FetchStatus';
import {
    selectFavoritesByCities,
    selectFavoritesFetchStatus,
    selectIsFavoritesEmpty,
} from 'store/selectors/hotels-selectors';
import { useAppDispatch } from 'store/store';
import { requestFavoritesThunkAction } from 'store/thunk-actions/favorites-thunk-actions';

import { FavoritesList } from 'components/FavoritesList';
import { LoaderDelayed } from 'components/LoaderDelayed';
import { PageHeader } from 'components/PageHeader';
import { SvgInject } from 'components/SvgInject';

export const FavoritesPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const favorites = useSelector(selectFavoritesByCities);
    const favoritesFetchStatus = useSelector(selectFavoritesFetchStatus);
    const isFavoritesEmpty = useSelector(selectIsFavoritesEmpty);
    const [isFetchingComplete, setIsFetchingComplete] = useState(false);

    const isFavoritesFetching = useMemo(
        () => favoritesFetchStatus === FetchStatus.Fetching,
        [favoritesFetchStatus],
    );

    useEffect(() => {
        void dispatch(requestFavoritesThunkAction());
    }, [dispatch]);

    return (
        <>
            {!isFetchingComplete && (
                <LoaderDelayed
                    dependencies={[isFavoritesFetching]}
                    handleContentIsReady={setIsFetchingComplete}
                />
            )}
            <SvgInject />
            <div className="page" style={{ minHeight: '100vh' }}>
                <PageHeader isWithUser />
                <main className="page__main page__main--favorites">
                    <div className="page__favorites-container container">
                        {isFavoritesEmpty ? (
                            <section className="favorites favorites--empty">
                                <h1 className="visually-hidden">Favorites (empty)</h1>
                                <div className="favorites__status-wrapper">
                                    <b className="favorites__status">Nothing yet saved.</b>
                                    <p className="favorites__status-description">
                                        Save properties to narrow down search or plan your future
                                        trips.
                                    </p>
                                </div>
                            </section>
                        ) : (
                            <section className="favorites">
                                <h1 className="favorites__title">Saved listing</h1>
                                <FavoritesList favorites={favorites} />
                            </section>
                        )}
                    </div>
                </main>
                <footer className="footer container">
                    <Link className="footer__logo-link" to={AppRoute.Home()}>
                        <img
                            className="footer__logo"
                            src="/img/logo.svg"
                            alt="6 cities logo"
                            width="64"
                            height="33"
                        />
                    </Link>
                </footer>
            </div>
        </>
    );
};
