import { AppRoute } from 'constants/AppRoute';

import React from 'react';
import { Navigate } from 'react-router-dom';

interface IPrivateRouteProps {
    children: JSX.Element;
}

export const PrivateRoute = ({ children }: IPrivateRouteProps): JSX.Element => {
    const isLoggedIn = true;
    if (!isLoggedIn) {
        return <Navigate to={AppRoute.Login()} />;
    }

    return children;
};
