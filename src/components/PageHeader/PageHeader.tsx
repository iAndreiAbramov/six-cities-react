import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppRoute } from 'constants/AppRoute';

import { UserBlock } from 'components/UserBlock';

interface IPageHeader {
    isWithUser?: boolean;
}

export const PageHeader: React.FC<IPageHeader> = ({ isWithUser }) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const handleLogoClick = () => {
        if (pathname !== AppRoute.Home()) {
            navigate(AppRoute.Home());
        }
    };

    return (
        <header className="header">
            <div className="container">
                <div className="header__wrapper">
                    <div className="header__left">
                        <span
                            className="header__logo-link header__logo-link--active"
                            onClick={handleLogoClick}
                            style={pathname !== AppRoute.Home() ? { cursor: 'pointer' } : {}}
                        >
                            <img
                                className="header__logo"
                                src="/img/logo.svg"
                                alt="6 cities logo"
                                width="81"
                                height="41"
                            />
                        </span>
                    </div>

                    {isWithUser && <UserBlock />}
                </div>
            </div>
        </header>
    );
};
