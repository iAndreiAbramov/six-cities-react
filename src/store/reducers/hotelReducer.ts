import { createSlice } from '@reduxjs/toolkit';
import { FetchStatus } from 'constants/FetchStatus';
import { postFavoriteThunkAction } from 'store/thunk-actions/favorites-thunk-actions';
import {
    postCommentThunkAction,
    requestCommentsThunkAction,
    requestHotelThunkAction,
    requestNearbyThunkAction,
} from 'store/thunk-actions/hotel-thunk-actions';
import { ICommentGetFront } from 'types/comment.types';
import { IHotelFront } from 'types/hotel.types';

export interface IHotelReducer {
    hotelError?: string;
    hotelFetchStatus: FetchStatus;
    hotelData: IHotelFront;
    commentsError?: string;
    commentsFetchStatus: FetchStatus;
    commentsData: ICommentGetFront[];
    commentPostError?: string;
    commentPostStatus: FetchStatus;
    nearbyError?: string;
    nearbyFetchStatus: FetchStatus;
    nearbyData: IHotelFront[];
    favoritesPostFetchStatus: FetchStatus;
    favoritesPostError?: string;
}

export const hotelInitialState: IHotelReducer = {
    hotelError: undefined,
    hotelFetchStatus: FetchStatus.Initial,
    hotelData: {} as IHotelFront,
    commentsError: undefined,
    commentsFetchStatus: FetchStatus.Initial,
    commentsData: [] as ICommentGetFront[],
    commentPostError: undefined,
    commentPostStatus: FetchStatus.Initial,
    nearbyError: undefined,
    nearbyFetchStatus: FetchStatus.Initial,
    nearbyData: [] as IHotelFront[],
    favoritesPostFetchStatus: FetchStatus.Initial,
    favoritesPostError: undefined,
};

const hotelSlice = createSlice({
    name: 'hotel',
    initialState: hotelInitialState,
    reducers: {
        resetCommentPostStateAction: (state) => {
            state.commentPostError = undefined;
            state.commentPostStatus = FetchStatus.Initial;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(requestHotelThunkAction.pending, (state) => {
                state.hotelFetchStatus = FetchStatus.Fetching;
                state.hotelError = undefined;
                state.hotelData = {} as IHotelFront;
            })
            .addCase(requestHotelThunkAction.fulfilled, (state, { payload }) => {
                state.hotelFetchStatus = FetchStatus.Done;
                state.hotelData = payload;
            })
            .addCase(requestHotelThunkAction.rejected, (state, { error }) => {
                state.hotelFetchStatus = FetchStatus.Error;
                state.hotelError = error.message;
                state.hotelData = {} as IHotelFront;
            })
            .addCase(requestCommentsThunkAction.pending, (state) => {
                state.commentsFetchStatus = FetchStatus.Fetching;
                state.commentsError = undefined;
                state.commentsData = [] as ICommentGetFront[];
            })
            .addCase(requestCommentsThunkAction.fulfilled, (state, { payload }) => {
                state.commentsFetchStatus = FetchStatus.Done;
                state.commentsData = payload;
            })
            .addCase(requestCommentsThunkAction.rejected, (state, { error }) => {
                state.commentsFetchStatus = FetchStatus.Error;
                state.commentsError = error.message;
                state.commentsData = [] as ICommentGetFront[];
            })
            .addCase(postCommentThunkAction.pending, (state) => {
                state.commentPostStatus = FetchStatus.Fetching;
                state.commentPostError = undefined;
            })
            .addCase(postCommentThunkAction.fulfilled, (state, { payload }) => {
                state.commentPostStatus = FetchStatus.Done;
                state.commentsData = payload || ([] as ICommentGetFront[]);
            })
            .addCase(postCommentThunkAction.rejected, (state, { error }) => {
                state.commentPostStatus = FetchStatus.Error;
                state.commentPostError = error.message;
            })
            .addCase(requestNearbyThunkAction.pending, (state) => {
                state.nearbyFetchStatus = FetchStatus.Fetching;
                state.nearbyError = undefined;
                state.nearbyData = [] as IHotelFront[];
            })
            .addCase(requestNearbyThunkAction.fulfilled, (state, { payload }) => {
                state.nearbyFetchStatus = FetchStatus.Done;
                state.nearbyData = payload;
            })
            .addCase(requestNearbyThunkAction.rejected, (state, { error }) => {
                state.nearbyFetchStatus = FetchStatus.Error;
                state.nearbyError = error.message;
                state.nearbyData = [] as IHotelFront[];
            })
            .addCase(postFavoriteThunkAction.pending, (state) => {
                state.favoritesPostFetchStatus = FetchStatus.Fetching;
                state.favoritesPostError = undefined;
            })
            .addCase(postFavoriteThunkAction.fulfilled, (state, { payload }) => {
                state.favoritesPostFetchStatus = FetchStatus.Done;
                state.hotelData.isFavorite = payload.isFavorite;

                const nearbyStoredItemIndex = state.nearbyData.findIndex(
                    (item) => item.id === payload.id,
                );

                if (nearbyStoredItemIndex !== -1) {
                    state.nearbyData = [
                        ...state.nearbyData.slice(0, nearbyStoredItemIndex),
                        payload,
                        ...state.nearbyData.slice(nearbyStoredItemIndex + 1),
                    ];
                }
            })
            .addCase(postFavoriteThunkAction.rejected, (state, { error }) => {
                state.favoritesPostFetchStatus = FetchStatus.Error;
                state.favoritesPostError = error.message;
            });
    },
});

export const { resetCommentPostStateAction } = hotelSlice.actions;
export const hotelReducer = hotelSlice.reducer;
