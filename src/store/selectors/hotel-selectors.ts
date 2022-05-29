import { createSelector } from '@reduxjs/toolkit';
import { IHotelReducer } from 'store/reducers/hotelReducer';
import { RootReducerTypes } from 'store/store';

const getHotelState = (state: RootReducerTypes): IHotelReducer => state.hotel;

export const selectHotel = createSelector([getHotelState], (state) => state.hotelData);
export const selectHotelFetchStatus = createSelector([getHotelState], (state) => state.fetchStatus);
