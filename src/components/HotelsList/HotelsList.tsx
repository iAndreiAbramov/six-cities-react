import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from 'constants/AppRoute';
import { QueryParam } from 'constants/QueryParam';
import { sortOptions } from 'constants/SortOptions';
import { useHotelsSort } from 'hooks/useHotelsSort';
import { useQuery } from 'hooks/useQuery';
import { IHotelFront } from 'types/hotel.types';
import { SortOptionQuery } from 'types/sort-options.types';

import { HomePageSortDropdown } from 'components/HomePageSortDropdown';
import { HotelsListItem } from 'components/HotelsListItem';

interface IHotelsListProps {
    hotels: IHotelFront[];
    activeCity: string;
    handleActiveHotelIdChange: (hotelId: number) => void;
}

export const HotelsList: React.FC<IHotelsListProps> = ({
    hotels,
    activeCity,
    handleActiveHotelIdChange,
}) => {
    const query = useQuery();
    const navigate = useNavigate();
    const [currentSort, setCurrentSort] = useState(query.get(QueryParam.Sort));

    const sortedHotels = useHotelsSort({ hotels, sortOption: currentSort });

    const handleSortChange = useCallback(
        (value: SortOptionQuery) => {
            setCurrentSort(value);
            query.set(QueryParam.Sort, value);
            navigate({
                pathname: AppRoute.Home(),
                search: query.toString(),
            });
        },
        [query, navigate],
    );

    return (
        <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{`${hotels.length} places to stay in ${activeCity}`}</b>
            <HomePageSortDropdown
                options={sortOptions}
                currentSort={currentSort}
                handleSortChange={handleSortChange}
            />
            <div className="cities__places-list places__list tabs__content">
                {sortedHotels.map(({ id, isPremium, rating, type, title, price, previewImage }) => (
                    <HotelsListItem
                        key={id}
                        id={id}
                        isPremium={isPremium}
                        rating={rating}
                        type={type}
                        title={title}
                        price={price}
                        previewImage={previewImage}
                        handleActiveHotelIdChange={handleActiveHotelIdChange}
                    />
                ))}
            </div>
        </section>
    );
};
