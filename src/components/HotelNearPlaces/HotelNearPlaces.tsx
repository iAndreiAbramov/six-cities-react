import React from 'react';
import { IHotelFront } from 'types/hotel.types';

import { HotelsListCard } from 'components/HotelsListCard';

interface HotelNearPlacesProps {
    handleActiveHotelIdChange: (hotelId: number) => void;
    nearPlaces: IHotelFront[];
}

export const HotelNearPlaces: React.FC<HotelNearPlacesProps> = ({
    nearPlaces,
    handleActiveHotelIdChange,
}) => {
    return (
        <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
                {nearPlaces.length > 0 &&
                    nearPlaces.map(
                        ({
                            id,
                            isPremium,
                            rating,
                            type,
                            title,
                            price,
                            previewImage,
                            isFavorite,
                        }) => (
                            <HotelsListCard
                                key={id}
                                id={id}
                                isPremium={isPremium}
                                rating={rating}
                                type={type}
                                title={title}
                                price={price}
                                previewImage={previewImage}
                                handleActiveHotelIdChange={handleActiveHotelIdChange}
                                isFavorite={isFavorite}
                            />
                        ),
                    )}
            </div>
        </section>
    );
};
