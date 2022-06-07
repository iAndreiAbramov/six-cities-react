import { configureMockStore } from '@jedmao/redux-mock-store';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { Action } from 'redux';
import thunk from 'redux-thunk';
import { hotelInitialState } from 'store/reducers/hotelReducer';
import { hotelsInitialState } from 'store/reducers/hotelsReducer';
import { userInitialState } from 'store/reducers/userReducer';
import { RootReducerTypes } from 'store/store';

import { userInitialStateWithData } from './user-mocks';

const middlewares = [thunk];

export const mockStoreRoot = configureMockStore<
    RootReducerTypes,
    Action,
    ThunkDispatch<RootReducerTypes, unknown, Action>
>(middlewares);

export const mockRootStoreUnauthorized = mockStoreRoot({
    user: userInitialState,
    hotel: hotelInitialState,
    hotels: hotelsInitialState,
});

export const mockRootStoreAuthorized = mockStoreRoot({
    user: userInitialStateWithData,
    hotel: hotelInitialState,
    hotels: hotelsInitialState,
});
