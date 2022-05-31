import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from 'constants/AppRoute';

import { SvgInject } from 'components/SvgInject';

export const NotFoundPage: React.FC = () => {
    return (
        <>
            <SvgInject />
            <div className="page page--gray page--login">
                <header className="header">
                    <div className="container">
                        <div className="header__wrapper">
                            <div className="header__left">
                                <Link className="header__logo-link" to={AppRoute.Home()}>
                                    <img
                                        className="header__logo"
                                        src="/img/logo.svg"
                                        alt="6 cities logo"
                                        width="81"
                                        height="41"
                                    />
                                </Link>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="page__main page__main--login">
                    <div className="page__login-container container">
                        <section className="login">
                            <div style={{ fontSize: '24px', marginBottom: '20px' }}>
                                Error 404: page not found
                            </div>
                            <Link to={AppRoute.Home()} style={{ textDecoration: 'underline' }}>
                                Return to main page
                            </Link>
                        </section>
                        <section className="locations locations--login locations--current" />
                    </div>
                </main>
            </div>
        </>
    );
};
