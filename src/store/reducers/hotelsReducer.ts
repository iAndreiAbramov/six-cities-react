import { createSlice } from '@reduxjs/toolkit';
import { FetchStatus } from 'constants/FetchStatus';
import { requestHotelsThunkAction } from 'store/thunk-actions/hotels-thunk-actions';
import { IHotelFront } from 'types/hotel.types';

export interface IHotelsReducer {
    error?: string;
    fetchStatus: FetchStatus;
    hotelsData: IHotelFront[];
}

const initialState: IHotelsReducer = {
    error: undefined,
    fetchStatus: FetchStatus.Initial,
    hotelsData: [] as IHotelFront[],
};

const hotelsSlice = createSlice({
    name: 'hotels',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(requestHotelsThunkAction.pending, (state) => {
                state.fetchStatus = FetchStatus.Fetching;
                state.error = undefined;
                state.hotelsData = [];
            })
            .addCase(requestHotelsThunkAction.fulfilled, (state, { payload }) => {
                state.fetchStatus = FetchStatus.Done;
                state.hotelsData = payload;
            })
            .addCase(requestHotelsThunkAction.rejected, (state, { error }) => {
                state.fetchStatus = FetchStatus.Error;
                state.error = error.message;
                state.hotelsData = [];
            });
    },
});

export const hotelsReducer = hotelsSlice.reducer;
