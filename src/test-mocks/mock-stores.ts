import { configureMockStore } from '@jedmao/redux-mock-store';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { Action } from 'redux';
import thunk from 'redux-thunk';
import { hotelInitialState, IHotelReducer } from 'store/reducers/hotelReducer';
import { hotelsInitialState, IHotelsReducer } from 'store/reducers/hotelsReducer';
import { IUserReducer, userInitialState } from 'store/reducers/userReducer';
import { RootReducerTypes } from 'store/store';

const middlewares = [thunk];

const mockStoreUser = configureMockStore<
    IUserReducer,
    Action,
    ThunkDispatch<IUserReducer, unknown, Action>
>(middlewares);

export const mockUserStore = mockStoreUser(userInitialState);

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

export const mockRootStore = mockStoreRoot({
    user: userInitialState,
    hotel: hotelInitialState,
    hotels: hotelsInitialState,
});
