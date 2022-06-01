import { api } from 'api/api';
import { AxiosError } from 'axios';
import { ApiRoute } from 'constants/ApiRoute';
import { FavoriteStatus } from 'constants/FavoriteStatus';
import { IHotelBack } from 'types/hotel.types';

export const postFavorite = async ({
    id,
    status,
}: {
    id: string;
    status: FavoriteStatus;
}): Promise<IHotelBack> =>
    await api
        .post<Promise<IHotelBack>>(ApiRoute.FavoritePost(id, status))
        .then((response) => response?.data)
        .catch((error: AxiosError) => {
            throw new Error(
                (error?.response?.data as { error: string })?.error ||
                    'Unknown server error, please try later',
            );
        });

export const requestFavorites = async (): Promise<IHotelBack[]> =>
    await api
        .get<Promise<IHotelBack[]>>(ApiRoute.FavoriteGet())
        .then((response) => response?.data)
        .catch((error: AxiosError) => {
            throw new Error(
                (error?.response?.data as { error: string })?.error ||
                    'Unknown server error, please try later',
            );
        });
