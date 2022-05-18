import { createAsyncThunk } from '@reduxjs/toolkit';
import { requestLogin, requestLoginCheck, requestLogout } from 'api/services/loginService';
import { IUserAuthRequest } from 'types/user-auth.types';

import { adaptUserToFront } from 'utils/adapters';

export const requestLoginThunkAction = createAsyncThunk(
    'user/login',
    async (authInfo: IUserAuthRequest) =>
        await requestLogin(authInfo)
            .then((data) => adaptUserToFront(data))
            .catch((error: string) => {
                throw error;
            }),
);

export const requestLoginCheckThunkAction = createAsyncThunk(
    'user/check',
    async () => await requestLoginCheck().then((data) => adaptUserToFront(data)),
);

export const requestLogoutThunkAction = createAsyncThunk(
    'user/logout',
    async () => await requestLogout(),
);
