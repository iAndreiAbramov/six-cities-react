import React from 'react';
import { IHotelFront } from 'types/hotel.types';

import { HotelsListItem } from 'components/HotelsListItem';

interface HotelNearPlacesProps {
    nearPlaces: IHotelFront[];
}

export const HotelNearPlaces: React.FC<HotelNearPlacesProps> = ({ nearPlaces }) => {
    return (
        <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
                {nearPlaces.length > 0 &&
                    nearPlaces.map(
                        ({ id, isPremium, rating, type, title, price, previewImage }) => (
                            <HotelsListItem
                                key={id}
                                id={id}
                                isPremium={isPremium}
                                rating={rating}
                                type={type}
                                title={title}
                                price={price}
                                previewImage={previewImage}
                                handleActiveHotelIdChange={() => null}
                            />
                        ),
                    )}
            </div>
        </section>
    );
};
