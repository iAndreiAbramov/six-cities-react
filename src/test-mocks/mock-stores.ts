import { configureMockStore } from '@jedmao/redux-mock-store';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { Action } from 'redux';
import thunk from 'redux-thunk';
import { hotelInitialState, IHotelReducer } from 'store/reducers/hotelReducer';
import { hotelsInitialState, IHotelsReducer } from 'store/reducers/hotelsReducer';
import { IUserReducer, userInitialState } from 'store/reducers/userReducer';
import { RootReducerTypes } from 'store/store';

import { userInitialStateWithData } from './user-mocks';

const middlewares = [thunk];

const mockStoreUser = configureMockStore<
    IUserReducer,
    Action,
    ThunkDispatch<IUserReducer, unknown, Action>
>(middlewares);

export const mockUserStoreEmpty = mockStoreUser(userInitialState);
export const mockUserStoreWithData = mockStoreUser(userInitialStateWithData);

const mockStoreHotel = configureMockStore<
    IHotelReducer,
    Action,
    ThunkDispatch<IHotelReducer, unknown, Action>
>(middlewares);

export const mockHotelStore = mockStoreHotel(hotelInitialState);

const mockStoreHotels = configureMockStore<
    IHotelsReducer,
    Action,
    ThunkDispatch<IHotelsReducer, unknown, Action>
>(middlewares);

export const mockHotelsStore = mockStoreHotels(hotelsInitialState);

const mockStoreRoot = configureMockStore<
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
