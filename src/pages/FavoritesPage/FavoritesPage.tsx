import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoute } from 'constants/AppRoute';
import { FetchStatus } from 'constants/FetchStatus';
import { selectFavoritesFetchStatus } from 'store/selectors/hotels-selectors';

import { FavoritesList } from 'components/FavoritesList';
import { LoaderDelayed } from 'components/LoaderDelayed';
import { PageHeader } from 'components/PageHeader';
import { SvgInject } from 'components/SvgInject';

export const FavoritesPage: React.FC = () => {
    const favoritesFetchStatus = useSelector(selectFavoritesFetchStatus);
    const [isFetchingComplete, setIsFetchingComplete] = useState(false);

    const isFavoritesFetching = useMemo(
        () => favoritesFetchStatus === FetchStatus.Fetching,
        [favoritesFetchStatus],
    );

    return (
        <>
            {isFetchingComplete ? (
                <>
                    <SvgInject />
                    <div className="page" style={{ minHeight: '100vh' }}>
                        <PageHeader isWithUser />
                        <main className="page__main page__main--favorites">
                            <div className="page__favorites-container container">
                                <section className="favorites">
                                    <h1 className="favorites__title">Saved listing</h1>
                                    <FavoritesList />
                                </section>
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
            ) : (
                <LoaderDelayed
                    dependencies={[isFavoritesFetching]}
                    handleContentIsReady={setIsFetchingComplete}
                />
            )}
        </>
    );
};
