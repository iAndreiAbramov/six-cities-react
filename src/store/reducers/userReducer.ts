import { createSlice } from '@reduxjs/toolkit';
import { FetchStatus } from 'constants/FetchStatus';
import {
    requestLoginCheckThunkAction,
    requestLoginThunkAction,
    requestLogoutThunkAction,
} from 'store/thunk-actions/login-thunk-actions';
import { IUserFront } from 'types/user-auth.types';

export interface IUserReducer {
    error?: string;
    fetchStatus: FetchStatus;
    data: IUserFront;
}

const initialState: IUserReducer = {
    error: undefined,
    fetchStatus: FetchStatus.Initial,
    data: {} as IUserFront,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(requestLoginThunkAction.pending, (state) => {
                state.fetchStatus = FetchStatus.Fetching;
                state.error = undefined;
                state.data = {} as IUserFront;
            })
            .addCase(requestLoginThunkAction.fulfilled, (state, { payload }) => {
                state.fetchStatus = FetchStatus.Done;
                state.error = undefined;
                state.data = payload;
            })
            .addCase(requestLoginThunkAction.rejected, (state, { error }) => {
                state.fetchStatus = FetchStatus.Error;
                state.error = error.message;
                state.data = {} as IUserFront;
            })
            .addCase(requestLoginCheckThunkAction.pending, (state) => {
                state.fetchStatus = FetchStatus.Fetching;
                state.error = undefined;
            })
            .addCase(requestLoginCheckThunkAction.fulfilled, (state, { payload }) => {
                state.fetchStatus = FetchStatus.Done;
                state.error = undefined;
                state.data = payload;
            })
            .addCase(requestLoginCheckThunkAction.rejected, (state) => {
                state.fetchStatus = FetchStatus.Error;
                state.error = undefined;
                state.data = {} as IUserFront;
            })
            .addCase(requestLogoutThunkAction.pending, (state) => {
                state.fetchStatus = FetchStatus.Fetching;
                state.error = undefined;
            })
            .addCase(requestLogoutThunkAction.fulfilled, (state) => {
                state.fetchStatus = FetchStatus.Done;
                state.error = undefined;
                state.data = {} as IUserFront;
            })
            .addCase(requestLogoutThunkAction.rejected, (state, { error }) => {
                state.fetchStatus = FetchStatus.Error;
                state.error = error.message;
            });
    },
});

export const userReducer = userSlice.reducer;
