import React, { useEffect } from 'react';
import { useHotels } from 'hooks/useHotels';
import { useAppDispatch } from 'store/store';
import { requestHotelsThunkAction } from 'store/thunk-actions/hotels-thunk-actions';

import { HotelsListItem } from 'components/HotelsListItem';

export const HotelsList: React.FC = () => {
    const dispatch = useAppDispatch();
    const hotels = useHotels();

    useEffect(() => {
        void dispatch(requestHotelsThunkAction());
    }, [dispatch]);

    return (
        <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">312 places to stay in Amsterdam</b>
            <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                    Popular
                    <svg className="places__sorting-arrow" width="7" height="4">
                        <use xlinkHref="#icon-arrow-select" />
                    </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                    <li className="places__option places__option--active" tabIndex={0}>
                        Popular
                    </li>
                    <li className="places__option" tabIndex={0}>
                        Price: low to high
                    </li>
                    <li className="places__option" tabIndex={0}>
                        Price: high to low
                    </li>
                    <li className="places__option" tabIndex={0}>
                        Top rated first
                    </li>
                </ul>
            </form>
            <div className="cities__places-list places__list tabs__content">
                {hotels.length > 0 &&
                    hotels.map(({ id, isPremium, rating, type, title, price, previewImage }) => (
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
