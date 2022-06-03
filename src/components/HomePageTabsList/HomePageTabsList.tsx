import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from 'constants/AppRoute';
import { cities, CityName } from 'constants/Cities';
import { QueryParam } from 'constants/QueryParam';
import { useQuery } from 'hooks/useQuery';

import { HomePageTabsItem } from './HomePageTabsItem';

export const HomePageTabsList: React.FC = () => {
    const query = useQuery();
    const navigate = useNavigate();

    const handleTabClick = useCallback(
        (queryName: CityName) => {
            query.set(QueryParam.City, queryName);
            navigate({
                pathname: AppRoute.Home(),
                search: query.toString(),
            });
        },
        [navigate, query],
    );

    return (
        <div className="tabs">
            <section className="locations container">
                <ul className="locations__list tabs__list">
                    {cities.map((name) => (
                        <HomePageTabsItem
                            key={name}
                            name={name}
                            handleClick={handleTabClick}
                            isActive={query.get(QueryParam.City) === name}
                        />
                    ))}
                </ul>
            </section>
        </div>
    );
};
