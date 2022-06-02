import { createSelector } from '@reduxjs/toolkit';
import { IHotelsReducer } from 'store/reducers/hotelsReducer';
import { RootReducerTypes } from 'store/store';
import { IHotelFront } from 'types/hotel.types';

const getHotelsState = (state: RootReducerTypes): IHotelsReducer => state.hotels;

export const selectHotels = createSelector([getHotelsState], (hotels) => hotels.hotelsData);
export const selectHotelsFetchStatus = createSelector(
    [getHotelsState],
    (hotels) => hotels.hotelsFetchStatus,
);

export const selectFavoritesByCities = createSelector([getHotelsState], (hotels) => {
    const favorites = {} as Record<string, IHotelFront[]>;
    hotels.favoritesData.forEach((hotel) => {
        const city = hotel.city.name;
        if (city in favorites) {
            favorites[`${city}`].push(hotel);
        } else {
            favorites[`${city}`] = [hotel];
        }
    });

    return favorites;
});

export const selectFavoritesFetchStatus = createSelector(
    [getHotelsState],
    (hotels) => hotels.favoritesGetFetchStatus,
);

export const selectFavoritesPostFetchStatus = createSelector(
    [getHotelsState],
    (hotels) => hotels.favoritesPostFetchStatus,
);
