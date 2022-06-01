import { createSelector } from '@reduxjs/toolkit';
import { IHotelsReducer } from 'store/reducers/hotelsReducer';
import { RootReducerTypes } from 'store/store';

const getHotelsState = (state: RootReducerTypes): IHotelsReducer => state.hotels;

export const selectHotels = createSelector([getHotelsState], (hotels) => hotels.hotelsData);
export const selectHotelsFetchStatus = createSelector(
    [getHotelsState],
    (hotels) => hotels.hotelsFetchStatus,
);
