import { api } from 'api/api';
import { AxiosError, AxiosResponse } from 'axios';
import { ApiRoute } from 'constants/ApiRoute';
import { IUserAuthRequest, IUserAuthResponse } from 'types/user-auth.types';

export const requestLogin = async (authInfo: IUserAuthRequest): Promise<IUserAuthResponse> =>
    await api
        .post<Promise<IUserAuthResponse>, AxiosResponse<Promise<IUserAuthResponse>>>(
            ApiRoute.Login(),
            authInfo,
        )
        .then((response) => response?.data)
        .catch((error: AxiosError) => {
            throw new Error(
                (error?.response?.data as { error: string })?.error ||
                    'Unknown server error, please try later',
            );
        });

export const requestLoginCheck = async (): Promise<IUserAuthResponse> =>
    await api.get<Promise<IUserAuthResponse>>(ApiRoute.Login()).then((response) => response?.data);

export const requestLogout = async (): Promise<void> => await api.delete(ApiRoute.Logout());
