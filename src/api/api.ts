import axios from 'axios';

import { getToken, setToken } from './token';

const BASE_URL = 'https://8.react.pages.academy/six-cities';
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
    (response) => {
        const token = response.headers[AUTH_TOKEN_NAME];
        if (response.headers[AUTH_TOKEN_NAME]) {
            setToken(token);
        }
        return response;
    },
    (error) => {
        return Promise.reject(error);
    },
);
