import { createAsyncThunk } from '@reduxjs/toolkit';
import { requestLogin } from 'api/services/loginService';
import { IUserAuthRequest } from 'types/user-auth.types';

export const requestLoginThunkAction = createAsyncThunk(
    'user/login',
    async (authInfo: IUserAuthRequest) => await requestLogin(authInfo),
);
