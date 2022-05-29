import { AppRoute } from 'constants/AppRoute';
import { CityName } from 'constants/Cities';
import { FetchStatus } from 'constants/FetchStatus';
import { QueryParam } from 'constants/QueryParam';

import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useHotelsFilter } from 'hooks/useHotelsFilter';
import { useQuery } from 'hooks/useQuery';
import { selectHotelsFetchStatus } from 'store/selectors/hotels-selectors';
import { useAppDispatch } from 'store/store';
import { requestHotelsThunkAction } from 'store/thunk-actions/hotels-thunk-actions';
import { SortOption } from 'types/sort-options.types';

import { HomePageMap } from 'components/HomePageMap';
import { HomePageNoContent } from 'components/HomePageNoContent';
import { HomePageTabsList } from 'components/HomePageTabsList';
import { HotelsList } from 'components/HotelsList';
import { PageHeader } from 'components/PageHeader';
import { SvgInject } from 'components/SvgInject';

export const HomePage: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const query = useQuery();
    const queryCity = query.get(QueryParam.City);
    const hotels = useHotelsFilter(queryCity);
    const hotelsFetchStatus = useSelector(selectHotelsFetchStatus);

    const activeCity = useMemo(() => {
        if (!queryCity) {
            return '';
        }
        return queryCity.replace(/^\S/i, (match) => match.toUpperCase());
    }, [queryCity]);

    useEffect(() => {
        if (!query.get(QueryParam.City)) {
            query.set(QueryParam.City, CityName.Paris);
        }
        if (!query.get(QueryParam.Sort)) {
            query.set(QueryParam.Sort, SortOption.Popular);
        }
        navigate({
            pathname: AppRoute.Home(),
            search: query.toString(),
        });
    }, [query, navigate]);

    useEffect(() => {
        if (hotelsFetchStatus === FetchStatus.Initial) {
            void dispatch(requestHotelsThunkAction());
        }
    }, [dispatch, hotelsFetchStatus]);

    return (
        <>
            <SvgInject />
            <div className="page page--gray page--main">
                <PageHeader isWithUser />
                <HomePageTabsList />
                <main
                    className={`page__main page__main--index ${
                        hotels.length === 0 ? 'page__main--index-empty' : ''
                    }`}
                >
                    <h1 className="visually-hidden">Cities</h1>
                    <div className="cities">
                        <div className="cities__places-container container">
                            {hotels.length === 0 && hotelsFetchStatus === FetchStatus.Done ? (
                                <HomePageNoContent activeCity={activeCity} />
                            ) : (
                                <>
                                    <HotelsList hotels={hotels} activeCity={activeCity} />
                                    <HomePageMap />
                                </>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};
