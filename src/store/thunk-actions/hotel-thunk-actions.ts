import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    postComment,
    requestHotel,
    requestHotelComments,
    requestNearbyHotels,
} from 'api/services/hotel-service';
import { Notification } from 'constants/Notification';
import { ICommentPost } from 'types/comment.types';

import { adaptCommentsToFront, adaptHotelsListToFront, adaptHotelToFront } from 'utils/adapters';
import { notifyError, notifySuccess } from 'utils/toasts';

export const requestHotelThunkAction = createAsyncThunk('hotel/requestHotel', async (id: string) =>
    requestHotel(id).then((data) => adaptHotelToFront(data)),
);

export const requestCommentsThunkAction = createAsyncThunk('hotel/comments', async (id: string) =>
    requestHotelComments(id).then((commentsData) => adaptCommentsToFront(commentsData)),
);

export const postCommentThunkAction = createAsyncThunk(
    'hotel/commentPost',
    async ({ id, body }: { id: string; body: ICommentPost }) =>
        postComment({ id, body })
            .then((commentsData) => {
                notifySuccess(Notification.CommentPostSuccess);
                return adaptCommentsToFront(commentsData);
            })
            .catch((error: Error) => {
                notifyError(Notification.CommentPostError);
                throw new Error(error.message);
            }),
);

export const requestNearbyThunkAction = createAsyncThunk(
    'hotel/requestNearby',
    async (id: string) => requestNearbyHotels(id).then((data) => adaptHotelsListToFront(data)),
);
