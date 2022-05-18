import { AppRoute } from 'constants/AppRoute';
import { QueryParam } from 'constants/QueryParam';
import { homePageTabs } from 'constants/tabs';

import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'hooks/useQuery';
import { TabQueryName } from 'types/tabs.types';

import { HomePageTabsItem } from './HomePageTabsItem';

export const HomePageTabsList: React.FC = () => {
    const query = useQuery();
    const navigate = useNavigate();

    const handleTabClick = useCallback(
        (queryName: TabQueryName) => {
            query.set(QueryParam.City, queryName);
            navigate({
                pathname: AppRoute.Home(),
                search: query.toString(),
            });
        },
        [navigate, query],
    );

    useEffect(() => {
        if (!query.get(QueryParam.City)) {
            query.set(QueryParam.City, TabQueryName.Paris);
            navigate({
                pathname: AppRoute.Home(),
                search: query.toString(),
            });
        }
    }, [query, navigate]);

    return (
        <div className="tabs">
            <section className="locations container">
                <ul className="locations__list tabs__list">
                    {homePageTabs.map(({ id, name, queryName }) => (
                        <HomePageTabsItem
                            key={id}
                            name={name}
                            queryName={queryName}
                            handleClick={handleTabClick}
                            isActive={query.get(QueryParam.City) === queryName}
                        />
                    ))}
                </ul>
            </section>
        </div>
    );
};
