import { createSelector } from '@reduxjs/toolkit';
import { IHotelReducer } from 'store/reducers/hotelReducer';
import { RootReducerTypes } from 'store/store';

const getHotelState = (state: RootReducerTypes): IHotelReducer => state.hotel;

export const selectHotelData = createSelector([getHotelState], (state) => state.hotelData);

export const selectHotelFetchStatus = createSelector(
    [getHotelState],
    (state) => state.hotelFetchStatus,
);

export const selectCommentsFetchStatus = createSelector(
    [getHotelState],
    (state) => state.commentsFetchStatus,
);

export const selectNearbyFetchStatus = createSelector(
    [getHotelState],
    (state) => state.nearbyFetchStatus,
);

export const selectComments = createSelector([getHotelState], (state) => state.commentsData);

export const selectCommentPostError = createSelector(
    [getHotelState],
    (state) => state.commentPostError,
);

export const selectNearby = createSelector([getHotelState], (state) => state.nearbyData);
