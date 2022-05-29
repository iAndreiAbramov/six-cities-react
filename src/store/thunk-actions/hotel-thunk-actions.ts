import { createAsyncThunk } from '@reduxjs/toolkit';
import { requestHotel, requestHotelComments } from 'api/services/hotel-service';

import { adaptCommentsToFront, adaptHotelToFront } from 'utils/adapters';

export const requestHotelThunkAction = createAsyncThunk('hotel/requestHotel', async (id: string) =>
    requestHotel(id).then((data) => adaptHotelToFront(data)),
);

export const requestCommentsThunkAction = createAsyncThunk('hotel/comments', async (id: string) =>
    requestHotelComments(id).then((commentsData) => adaptCommentsToFront(commentsData)),
);
