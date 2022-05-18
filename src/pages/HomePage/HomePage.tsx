import React from 'react';

import { HomePageMap } from 'components/HomePageMap';
import { HomePageTabsList } from 'components/HomePageTabsList';
import { HotelsList } from 'components/HotelsList';
import { PageHeader } from 'components/PageHeader';
import { SvgInject } from 'components/SvgInject';

export const HomePage: React.FC = () => {
    return (
        <>
            <SvgInject />
            <div className="page page--gray page--main">
                <PageHeader isWithUser />
                <HomePageTabsList />
                <main className="page__main page__main--index">
                    <h1 className="visually-hidden">Cities</h1>

                    <div className="cities">
                        <div className="cities__places-container container">
                            <HotelsList />
                            <HomePageMap />
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};
