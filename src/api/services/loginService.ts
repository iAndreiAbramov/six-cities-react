import { ApiRoute } from 'constants/ApiRoute';

import { api } from 'api/api';
import { AxiosError } from 'axios';
import { IUserAuthRequest, IUserAuthResponse } from 'types/user-auth.types';

export const requestLogin = async (authInfo: IUserAuthRequest): Promise<IUserAuthResponse> =>
    api
        .post<Promise<IUserAuthResponse>>(ApiRoute.Login(), { authInfo })
        .then((response) => response?.data)
        .catch((error: AxiosError) => {
            throw JSON.stringify(error);
        });
