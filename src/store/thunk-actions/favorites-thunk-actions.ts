import { createAsyncThunk } from '@reduxjs/toolkit';
import { postFavorite, requestFavorites } from 'api/services/favorites-service';
import { FavoriteStatus } from 'constants/FavoriteStatus';

import { adaptHotelsListToFront, adaptHotelToFront } from 'utils/adapters';

export const requestFavoritesThunkAction = createAsyncThunk(
    'favorites/get',
    async () => await requestFavorites().then((data) => adaptHotelsListToFront(data)),
);

export const postFavoriteThunkAction = createAsyncThunk(
    'favorites/post',
    async ({ id, status }: { id: string; status: FavoriteStatus }) =>
        await postFavorite({ id, status }).then((data) => adaptHotelToFront(data)),
);
