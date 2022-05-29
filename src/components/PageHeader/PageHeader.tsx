import { AppRoute } from 'constants/AppRoute';

import React from 'react';
import { Link } from 'react-router-dom';

import { UserBlock } from 'components/UserBlock';

interface IPageHeader {
    isWithUser?: boolean;
}

export const PageHeader: React.FC<IPageHeader> = ({ isWithUser }) => {
    return (
        <header className="header">
            <div className="container">
                <div className="header__wrapper">
                    <div className="header__left">
                        <Link
                            to={AppRoute.Home()}
                            className="header__logo-link header__logo-link--active"
                        >
                            <img
                                className="header__logo"
                                src="/img/logo.svg"
                                alt="6 cities logo"
                                width="81"
                                height="41"
                            />
                        </Link>
                    </div>

                    {isWithUser && <UserBlock />}
                </div>
            </div>
        </header>
    );
};
