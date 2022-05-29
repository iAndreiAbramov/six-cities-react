import { createAsyncThunk } from '@reduxjs/toolkit';
import { requestHotel, requestHotelsList } from 'api/services/hotels-service';

import { adaptHotelsListToFront, adaptHotelToFront } from 'utils/adapters';

export const requestHotelsThunkAction = createAsyncThunk('hotels/requestList', async () =>
    requestHotelsList().then((data) => adaptHotelsListToFront(data)),
);

export const requestHotelThunkAction = createAsyncThunk('hotel/requestHotel', async (id: string) =>
    requestHotel(id).then((data) => adaptHotelToFront(data)),
);
