import { BASE_URL } from 'api/api';
import { ApiRoute } from 'constants/ApiRoute';
import { FavoriteStatus } from 'constants/FavoriteStatus';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { COMMENT_BACK_MOCK } from './comments-mock';
import { MOCK_HOTEL_FIRST_BACK, MOCK_HOTEL_THIRD_BACK, MOCK_HOTELS_BACK } from './hotel-mocks';
import { MOCK_USER_BACK } from './user-mocks';

const getMockUrl = (url: string) => `${BASE_URL}${url}`;

const favoritesAddTestId = '2';
const favoritesRemoveTestId = '1';
const hotelTestId = '1';

export const mockServer = setupServer(
    // hotels list
    rest.get(getMockUrl(ApiRoute.Hotels()), (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(MOCK_HOTELS_BACK));
    }),

    // hotel single
    rest.get(getMockUrl(ApiRoute.Hotel(hotelTestId)), (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(MOCK_HOTEL_FIRST_BACK));
    }),

    // get favorites
    rest.get(getMockUrl(ApiRoute.FavoriteGet()), (req, res, ctx) => {
        return res(ctx.status(200), ctx.json([MOCK_HOTEL_FIRST_BACK, MOCK_HOTEL_THIRD_BACK]));
    }),

    // add to favorites
    rest.post(
        getMockUrl(ApiRoute.FavoritePost(favoritesAddTestId, FavoriteStatus.Add)),
        (req, res, ctx) => {
            return res(ctx.json(MOCK_HOTEL_FIRST_BACK), ctx.status(200));
        },
    ),

    // remove from favorites
    rest.post(
        getMockUrl(ApiRoute.FavoritePost(favoritesRemoveTestId, FavoriteStatus.Remove)),
        (req, res, ctx) => {
            return res(ctx.json(MOCK_HOTEL_FIRST_BACK), ctx.status(200));
        },
    ),

    // get comments
    rest.get(getMockUrl(ApiRoute.Comments(hotelTestId)), (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(COMMENT_BACK_MOCK));
    }),

    // get nearby offers
    rest.get(getMockUrl(ApiRoute.Nearby(hotelTestId)), (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(MOCK_HOTELS_BACK));
    }),

    // authorization
    rest.get(getMockUrl(ApiRoute.Login()), (req, res, ctx) => {
        return res(ctx.json(MOCK_USER_BACK), ctx.status(200));
    }),

    // authorization check
    rest.post(getMockUrl(ApiRoute.Login()), (req, res, ctx) => {
        return res(ctx.json(MOCK_USER_BACK), ctx.status(200));
    }),

    // logout
    rest.delete(getMockUrl(ApiRoute.Logout()), (req, res, ctx) => {
        return res(ctx.status(204));
    }),
);
