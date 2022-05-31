import { api } from 'api/api';
import { AxiosError } from 'axios';
import { ApiRoute } from 'constants/ApiRoute';
import { IHotelBack } from 'types/hotel.types';

export const requestHotelsList = async (): Promise<IHotelBack[]> =>
    await api
        .get<Promise<IHotelBack[]>>(ApiRoute.Hotels())
        .then((response) => response?.data)
        .catch((error: AxiosError) => {
            throw new Error(
                (error?.response?.data as { error: string })?.error ||
                    'Unknown server error, please try later',
            );
        });
