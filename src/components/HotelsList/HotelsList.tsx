import { QueryParam } from 'constants/QueryParam';
import { sortOptions } from 'constants/SortOptions';

import React from 'react';
import { useQuery } from 'hooks/useQuery';
import { IHotelFront } from 'types/hotel.types';

import { HomePageSortDropdown } from 'components/HomePageSortDropdown';
import { HotelsListItem } from 'components/HotelsListItem';

interface IHotelsListProps {
    hotels: IHotelFront[];
    activeCity: string;
}

export const HotelsList: React.FC<IHotelsListProps> = ({ hotels, activeCity }) => {
    const query = useQuery();
    const currentSort = query.get(QueryParam.Sort);

    return (
        <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{`${hotels.length} places to stay in ${activeCity}`}</b>
            <HomePageSortDropdown options={sortOptions} currentSort={currentSort} />
            <div className="cities__places-list places__list tabs__content">
                {hotels.map(({ id, isPremium, rating, type, title, price, previewImage }) => (
                    <HotelsListItem
                        key={id}
                        id={id}
                        isPremium={isPremium}
                        rating={rating}
                        type={type}
                        title={title}
                        price={price}
                        previewImage={previewImage}
                    />
                ))}
            </div>
        </section>
    );
};
