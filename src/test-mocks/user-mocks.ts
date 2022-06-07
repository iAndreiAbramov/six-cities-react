import { FetchStatus } from 'constants/FetchStatus';

export const MOCK_USER_BACK = {
    ['avatar_url']: 'avatar/url',
    email: '123@123.com',
    id: 1,
    ['is_pro']: true,
    name: 'Ivan',
    token: 'token',
};

export const MOCK_USER_FRONT = {
    avatarUrl: 'avatar/url',
    email: '123@123.com',
    id: 1,
    isPro: true,
    name: 'Ivan',
};

export const userInitialStateWithData = {
    error: undefined,
    loginFetchStatus: FetchStatus.Done,
    checkFetchStatus: FetchStatus.Done,
    data: {
        avatarUrl: 'avatarUrl',
        email: 'email',
        id: 1,
        isPro: true,
        name: 'name',
    },
};
