import { FetchStatus } from 'constants/FetchStatus';

import { createSlice } from '@reduxjs/toolkit';
import { requestLoginThunkAction } from 'store/thunk-actions/login-thunk-actions';
import { UserStoredDataTypes } from 'types/user-auth.types';

export interface IUserReducer {
    error?: string | null;
    fetchStatus: FetchStatus;
    data: UserStoredDataTypes;
}

const initialState: IUserReducer = {
    error: null,
    fetchStatus: FetchStatus.Initial,
    data: {} as UserStoredDataTypes,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(requestLoginThunkAction.pending, (state) => {
                state.fetchStatus = FetchStatus.Fetching;
                state.error = null;
                state.data = {} as UserStoredDataTypes;
            })
            .addCase(requestLoginThunkAction.fulfilled, (state, { payload }) => {
                state.fetchStatus = FetchStatus.Done;
                state.error = null;
                state.data = payload;
            })
            .addCase(requestLoginThunkAction.rejected, (state, { error }) => {
                state.fetchStatus = FetchStatus.Error;
                state.error = JSON.stringify(error);
                state.data = {} as UserStoredDataTypes;
            });
    },
});

export const userReducer = userSlice.reducer;
