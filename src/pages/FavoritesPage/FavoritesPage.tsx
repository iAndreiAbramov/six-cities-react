import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from 'constants/AppRoute';

import { FavoritesList } from 'components/FavoritesList';
import { PageHeader } from 'components/PageHeader';
import { SvgInject } from 'components/SvgInject';

export const FavoritesPage: React.FC = () => {
    return (
        <>
            <SvgInject />
            <div className="page">
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
    );
};
