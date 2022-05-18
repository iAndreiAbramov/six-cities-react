import { AppRoute } from 'constants/AppRoute';

import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectUserEmail } from 'store/selectors/user-selectors';

interface IPrivateRouteProps {
    children: JSX.Element;
}

export const PrivateRoute = ({ children }: IPrivateRouteProps): JSX.Element => {
    const userEmail = useSelector(selectUserEmail);
    if (!userEmail) {
        return <Navigate to={AppRoute.Login()} />;
    }

    return children;
};
