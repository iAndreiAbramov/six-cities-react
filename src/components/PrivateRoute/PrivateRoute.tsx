import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { AppRoute } from 'constants/AppRoute';
import { selectIsNotSignedIn } from 'store/selectors/user-selectors';

interface IPrivateRouteProps {
    children: JSX.Element;
}

export const PrivateRoute = ({ children }: IPrivateRouteProps): JSX.Element => {
    const isNotSignedIn = useSelector(selectIsNotSignedIn);

    if (isNotSignedIn) {
        return <Navigate to={AppRoute.Login()} />;
    }

    return children;
};
