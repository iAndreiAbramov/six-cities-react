import { createSlice } from '@reduxjs/toolkit';
import { FetchStatus } from 'constants/FetchStatus';
import {
    postFavoriteThunkAction,
    requestFavoritesThunkAction,
} from 'store/thunk-actions/favorites-thunk-actions';
import { requestHotelsThunkAction } from 'store/thunk-actions/hotels-thunk-actions';
import { IHotelFront } from 'types/hotel.types';

export interface IHotelsReducer {
    hotelsError?: string;
    hotelsFetchStatus: FetchStatus;
    hotelsData: IHotelFront[];
    favoritesGetError?: string;
    favoritesGetFetchStatus: FetchStatus;
    favoritesData: IHotelFront[];
    favoritesPostError?: string;
    favoritesPostFetchStatus: FetchStatus;
}

const initialState: IHotelsReducer = {
    hotelsError: undefined,
    hotelsFetchStatus: FetchStatus.Initial,
    hotelsData: [] as IHotelFront[],
    favoritesGetError: undefined,
    favoritesGetFetchStatus: FetchStatus.Initial,
    favoritesData: [] as IHotelFront[],
    favoritesPostError: undefined,
    favoritesPostFetchStatus: FetchStatus.Initial,
};

const hotelsSlice = createSlice({
    name: 'hotels',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(requestHotelsThunkAction.pending, (state) => {
                state.hotelsFetchStatus = FetchStatus.Fetching;
                state.hotelsError = undefined;
                state.hotelsData = [];
            })
            .addCase(requestHotelsThunkAction.fulfilled, (state, { payload }) => {
                state.hotelsFetchStatus = FetchStatus.Done;
                state.hotelsData = payload;
            })
            .addCase(requestHotelsThunkAction.rejected, (state, { error }) => {
                state.hotelsFetchStatus = FetchStatus.Error;
                state.hotelsError = error.message;
                state.hotelsData = [];
            })
            .addCase(requestFavoritesThunkAction.pending, (state) => {
                state.favoritesGetFetchStatus = FetchStatus.Fetching;
                state.favoritesGetError = undefined;
                state.favoritesData = [];
            })
            .addCase(requestFavoritesThunkAction.fulfilled, (state, { payload }) => {
                state.favoritesGetFetchStatus = FetchStatus.Done;
                state.favoritesData = payload;
            })
            .addCase(requestFavoritesThunkAction.rejected, (state, { error }) => {
                state.favoritesGetFetchStatus = FetchStatus.Error;
                state.favoritesGetError = error.message;
                state.favoritesData = [];
            })
            .addCase(postFavoriteThunkAction.pending, (state) => {
                state.favoritesPostFetchStatus = FetchStatus.Fetching;
                state.favoritesPostError = undefined;
            })
            .addCase(postFavoriteThunkAction.fulfilled, (state, { payload }) => {
                state.favoritesPostFetchStatus = FetchStatus.Done;
                const storedHotelItemIndex = state.hotelsData.findIndex(
                    (item) => item.id === payload.id,
                );
                const storedFavoriteItemIndex = state.favoritesData.findIndex(
                    (item) => item.id === payload.id,
                );

                if (storedHotelItemIndex !== -1) {
                    state.hotelsData = [
                        ...state.hotelsData.slice(0, storedHotelItemIndex),
                        payload,
                        ...state.hotelsData.slice(storedHotelItemIndex + 1),
                    ];
                }

                if (storedFavoriteItemIndex !== -1) {
                    state.favoritesData = [
                        ...state.favoritesData.slice(0, storedFavoriteItemIndex),
                        ...state.favoritesData.slice(storedFavoriteItemIndex + 1),
                    ];
                }
            })
            .addCase(postFavoriteThunkAction.rejected, (state, { error }) => {
                state.favoritesPostFetchStatus = FetchStatus.Error;
                state.favoritesPostError = error.message;
            });
    },
});

export const hotelsReducer = hotelsSlice.reducer;
