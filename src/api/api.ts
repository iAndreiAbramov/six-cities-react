import axios, { AxiosResponse } from 'axios';
import { IUserAuthResponse } from 'types/user-auth.types';

import { getToken, setToken } from './token';

export const BASE_URL = 'https://8.react.pages.academy/six-cities';
const REQUEST_TIMEOUT = 5000;
const AUTH_TOKEN_NAME = 'X-Token';

export const api = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
});

api.interceptors.request.use(
    (request) => {
        const token = getToken();
        if (token) {
            request.headers = Object.assign({ ...request.headers }, { [AUTH_TOKEN_NAME]: token });
        }
        return request;
    },
    (error) => {
        return Promise.reject(error);
    },
);

api.interceptors.response.use(
    (response: AxiosResponse<IUserAuthResponse>) => {
        const token = response?.data?.token;
        if (token) {
            setToken(token);
        }
        return response;
    },
    (error) => {
        return Promise.reject(error);
    },
);
