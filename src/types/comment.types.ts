export interface ICommentGetBack {
    comment: string;
    date: string;
    id: number;
    rating: number;
    user: {
        avatar_url: string;
        id: number;
        is_pro: boolean;
        name: string;
    };
}

export interface ICommentGetFront {
    comment: string;
    date: string;
    id: number;
    rating: number;
    user: {
        avatarUrl: string;
        id: number;
        isPro: boolean;
        name: string;
    };
}

export type RatingType = 1 | 2 | 3 | 4 | 5;

export interface IReviewFormValues {
    rating: RatingType;
    comment: string;
}

export interface ICommentPost {
    comment: string;
    rating: 1 | 2 | 3 | 4 | 5;
}
