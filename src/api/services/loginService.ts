import { ApiRoute } from 'constants/ApiRoute';

import { api } from 'api/api';
import { AxiosError, AxiosResponse } from 'axios';
import { IUserAuthRequest, IUserAuthResponse } from 'types/user-auth.types';

export const requestLogin = async (authInfo: IUserAuthRequest): Promise<IUserAuthResponse> =>
    await api
        .post<Promise<IUserAuthResponse>, AxiosResponse<Promise<IUserAuthResponse>>>(
            ApiRoute.Login(),
            authInfo,
        )
        .then((response) => response?.data)
        .catch((error: AxiosError) => {
            throw JSON.stringify(error);
        });
