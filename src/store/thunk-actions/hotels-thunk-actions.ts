import { createAsyncThunk } from '@reduxjs/toolkit';
import { requestHotelsList } from 'api/services/hotelsService';

import { adaptHotelsListToFront } from 'utils/adapters';

export const requestHotelsThunkAction = createAsyncThunk('hotels/requestList', async () =>
    requestHotelsList().then((data) => adaptHotelsListToFront(data)),
);
