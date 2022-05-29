import { FetchStatus } from 'constants/FetchStatus';

import { createSlice } from '@reduxjs/toolkit';
import { requestHotelThunkAction } from 'store/thunk-actions/hotels-thunk-actions';
import { IHotelFront } from 'types/hotel.types';

export interface IHotelReducer {
    error?: string;
    fetchStatus: FetchStatus;
    hotelData: IHotelFront;
}

const initialState: IHotelReducer = {
    error: undefined,
    fetchStatus: FetchStatus.Initial,
    hotelData: {} as IHotelFront,
};

const hotelSlice = createSlice({
    name: 'hotel',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(requestHotelThunkAction.pending, (state) => {
                state.fetchStatus = FetchStatus.Fetching;
                state.error = undefined;
                state.hotelData = {} as IHotelFront;
            })
            .addCase(requestHotelThunkAction.fulfilled, (state, { payload }) => {
                state.fetchStatus = FetchStatus.Done;
                state.hotelData = payload;
            })
            .addCase(requestHotelThunkAction.rejected, (state, { error }) => {
                state.fetchStatus = FetchStatus.Error;
                state.error = error.message;
                state.hotelData = {} as IHotelFront;
            });
    },
});

export const hotelReducer = hotelSlice.reducer;
