import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { AppRoute } from 'constants/AppRoute';
import { selectIsNotSignedIn } from 'store/selectors/user-selectors';

interface IPrivateRouteProps {
    children: JSX.Element;
}

export const PublicRoute = ({ children }: IPrivateRouteProps): JSX.Element => {
    const isSignedIn = !useSelector(selectIsNotSignedIn);
    const location = useLocation();
    const destination =
        (location?.state as { from: { pathname: string } })?.from?.pathname || AppRoute.Home();

    if (isSignedIn) {
        return <Navigate to={destination} />;
    }

    return children;
};
