import { ApiRoute } from 'constants/ApiRoute';

import { api } from 'api/api';
import { AxiosError } from 'axios';
import { ICommentGetBack } from 'types/comment.types';
import { IHotelBack } from 'types/hotel.types';

export const requestHotel = (id: string): Promise<IHotelBack> =>
    api
        .get<Promise<IHotelBack>>(ApiRoute.Hotel(id))
        .then((response) => response?.data)
        .catch((error: AxiosError) => {
            throw new Error(
                (error?.response?.data as { error: string })?.error ||
                    'Unknown server error, please try later',
            );
        });

export const requestHotelComments = (id: string): Promise<ICommentGetBack[]> =>
    api
        .get<Promise<ICommentGetBack[]>>(ApiRoute.Comments(id))
        .then((response) => response?.data)
        .catch((error: AxiosError) => {
            throw new Error(
                (error?.response?.data as { error: string })?.error ||
                    'Unknown server error, please try later',
            );
        });
