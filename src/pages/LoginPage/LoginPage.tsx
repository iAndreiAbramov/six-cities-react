import { AppRoute } from 'constants/AppRoute';

import React from 'react';
import { useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { selectUserError, selectUserName } from 'store/selectors/user-selectors';
import { useAppDispatch } from 'store/store';
import { requestLoginThunkAction } from 'store/thunk-actions/login-thunk-actions';
import { IUserAuthRequest } from 'types/user-auth.types';

import { LoginForm } from 'components/LoginForm';
import { SvgInject } from 'components/SvgInject';

export const LoginPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const userError = useSelector(selectUserError);
    const userName = useSelector(selectUserName);

    const handleFormSubmit = (values: IUserAuthRequest) => {
        void dispatch(requestLoginThunkAction(values));
    };

    if (userName) {
        return <Navigate to={AppRoute.Home()} />;
    }

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
                        <LoginForm handleFormSubmit={handleFormSubmit} error={userError} />
                        <section className="locations locations--login locations--current">
                            <div className="locations__item">
                                <a className="locations__item-link" href="#">
                                    <span>Amsterdam</span>
                                </a>
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </>
    );
};
