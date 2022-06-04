export const COMMENT_BACK_MOCK = {
    comment: 'comment',
    date: 'date',
    id: 1,
    rating: 5,
    user: {
        ['avatar_url']: 'avatar/url',
        id: 1,
        ['is_pro']: true,
        name: 'name',
    },
};

export const COMMENT_FRONT_MOCK = {
    comment: 'comment',
    date: 'date',
    id: 1,
    rating: 5,
    user: {
        avatarUrl: 'avatar/url',
        id: 1,
        isPro: true,
        name: 'name',
    },
};

export const COMMENTS_BACK_MOCK = [COMMENT_BACK_MOCK, COMMENT_BACK_MOCK, COMMENT_BACK_MOCK];

export const COMMENTS_FRONT_MOCK = [COMMENT_FRONT_MOCK, COMMENT_FRONT_MOCK, COMMENT_FRONT_MOCK];
