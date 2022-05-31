import { api } from 'api/api';
import { AxiosError, AxiosResponse } from 'axios';
import { ApiRoute } from 'constants/ApiRoute';
import { ICommentGetBack, ICommentPost } from 'types/comment.types';
import { IHotelBack } from 'types/hotel.types';

export const requestHotel = async (id: string): Promise<IHotelBack> =>
    await api
        .get<Promise<IHotelBack>>(ApiRoute.Hotel(id))
        .then((response) => response?.data)
        .catch((error: AxiosError) => {
            throw new Error(
                (error?.response?.data as { error: string })?.error ||
                    'Unknown server error, please try later',
            );
        });

export const requestHotelComments = async (id: string): Promise<ICommentGetBack[]> =>
    await api
        .get<Promise<ICommentGetBack[]>>(ApiRoute.Comments(id))
        .then((response) => response?.data)
        .catch((error: AxiosError) => {
            throw new Error(
                (error?.response?.data as { error: string })?.error ||
                    'Unknown server error, please try later',
            );
        });

export const postComment = async ({
    id,
    body,
}: {
    id: string;
    body: ICommentPost;
}): Promise<ICommentGetBack[]> =>
    api
        .post<Promise<ICommentGetBack[]>, AxiosResponse<Promise<ICommentGetBack[]>>>(
            ApiRoute.Comments(id),
            body,
        )
        .then((response) => response?.data)
        .catch((error: AxiosError) => {
            throw new Error(
                (error?.response?.data as { error: string })?.error ||
                    'Unknown server error, please try later',
            );
        });
