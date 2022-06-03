import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AppRoute } from 'constants/AppRoute';
import { CityName } from 'constants/Cities';
import { QueryParam } from 'constants/QueryParam';
import { useQuery } from 'hooks/useQuery';
import { useRandomCity } from 'hooks/useRandomCity';
import { selectUserEmail, selectUserError } from 'store/selectors/user-selectors';
import { useAppDispatch } from 'store/store';
import { requestLoginThunkAction } from 'store/thunk-actions/login-thunk-actions';
import { IUserAuthRequest } from 'types/user-auth.types';

import { LoginForm } from 'components/LoginForm';
import { PageHeader } from 'components/PageHeader';
import { SvgInject } from 'components/SvgInject';

export const LoginPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const userError = useSelector(selectUserError);
    const userEmail = useSelector(selectUserEmail);
    const location = useLocation();
    const destination =
        (location?.state as { from: { pathname: string } })?.from?.pathname || AppRoute.Home();
    const query = useQuery();
    const navigate = useNavigate();

    const city = useRandomCity();

    const handleCityClick = () => {
        query.set(QueryParam.City, city);
        navigate({
            pathname: AppRoute.Home(),
            search: query.toString(),
        });
    };

    const handleFormSubmit = (values: IUserAuthRequest) => {
        void dispatch(requestLoginThunkAction(values));
    };

    if (userEmail) {
        return <Navigate to={destination} replace />;
    }

    return (
        <>
            <SvgInject />
            <div className="page page--gray page--login">
                <PageHeader />
                <main className="page__main page__main--login">
                    <div className="page__login-container container">
                        <LoginForm handleFormSubmit={handleFormSubmit} error={userError} />
                        <section className="locations locations--login locations--current">
                            <div className="locations__item" onClick={handleCityClick}>
                                <a className="locations__item-link">
                                    <span>{city || CityName.Amsterdam}</span>
                                </a>
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </>
    );
};
