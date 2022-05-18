import { FetchStatus } from 'constants/FetchStatus';

import { createSlice } from '@reduxjs/toolkit';
import { requestLoginThunkAction } from 'store/thunk-actions/login-thunk-actions';
import { UserStoredDataTypes } from 'types/user-auth.types';

export interface IUserReducer {
    error?: string;
    fetchStatus: FetchStatus;
    data: UserStoredDataTypes;
}

const initialState: IUserReducer = {
    error: undefined,
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
                state.error = undefined;
                state.data = {} as UserStoredDataTypes;
            })
            .addCase(requestLoginThunkAction.fulfilled, (state, { payload }) => {
                state.fetchStatus = FetchStatus.Done;
                state.error = undefined;
                state.data = payload as UserStoredDataTypes;
            })
            .addCase(requestLoginThunkAction.rejected, (state, { error }) => {
                state.fetchStatus = FetchStatus.Error;
                state.error = error.message;
                state.data = {} as UserStoredDataTypes;
            });
    },
});

export const userReducer = userSlice.reducer;
