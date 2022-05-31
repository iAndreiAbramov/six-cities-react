import { createSlice } from '@reduxjs/toolkit';
import { FetchStatus } from 'constants/FetchStatus';
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
    commentPostFetchStatus: FetchStatus;
    nearbyError?: string;
    nearbyFetchStatus: FetchStatus;
    nearbyData: IHotelFront[];
}

const initialState: IHotelReducer = {
    hotelError: undefined,
    hotelFetchStatus: FetchStatus.Initial,
    hotelData: {} as IHotelFront,
    commentsError: undefined,
    commentsFetchStatus: FetchStatus.Initial,
    commentsData: [] as ICommentGetFront[],
    commentPostError: undefined,
    commentPostFetchStatus: FetchStatus.Initial,
    nearbyError: undefined,
    nearbyFetchStatus: FetchStatus.Initial,
    nearbyData: [] as IHotelFront[],
};

const hotelSlice = createSlice({
    name: 'hotel',
    initialState,
    reducers: {
        resetCommentPostStateAction: (state) => {
            state.commentPostError = undefined;
            state.commentPostFetchStatus = FetchStatus.Initial;
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
                state.commentPostFetchStatus = FetchStatus.Fetching;
                state.commentPostError = undefined;
            })
            .addCase(postCommentThunkAction.fulfilled, (state, { payload }) => {
                state.commentPostFetchStatus = FetchStatus.Done;
                state.commentsData = payload || ([] as ICommentGetFront[]);
            })
            .addCase(postCommentThunkAction.rejected, (state, { error }) => {
                state.commentPostFetchStatus = FetchStatus.Error;
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
            });
    },
});

export const { resetCommentPostStateAction } = hotelSlice.actions;
export const hotelReducer = hotelSlice.reducer;
