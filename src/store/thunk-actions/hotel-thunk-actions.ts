import { createAsyncThunk } from '@reduxjs/toolkit';
import { postComment, requestHotel, requestHotelComments } from 'api/services/hotel-service';
import { ICommentPost } from 'types/comment.types';

import { adaptCommentsToFront, adaptHotelToFront } from 'utils/adapters';

export const requestHotelThunkAction = createAsyncThunk('hotel/requestHotel', async (id: string) =>
    requestHotel(id).then((data) => adaptHotelToFront(data)),
);

export const requestCommentsThunkAction = createAsyncThunk('hotel/comments', async (id: string) =>
    requestHotelComments(id).then((commentsData) => adaptCommentsToFront(commentsData)),
);

export const postCommentThunkAction = createAsyncThunk(
    'hotel/commentPost',
    async ({ id, body }: { id: string; body: ICommentPost }) =>
        postComment({ id, body }).then((commentsData) => adaptCommentsToFront(commentsData)),
);