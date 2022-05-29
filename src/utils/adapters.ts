import { ICommentGetBack, ICommentGetFront } from 'types/comment.types';
import { IHotelBack, IHotelFront } from 'types/hotel.types';
import { IUserAuthResponse, IUserFront } from 'types/user-auth.types';

export const adaptUserToFront = (userBack: IUserAuthResponse): IUserFront => {
    const { email, id, name } = userBack;
    return {
        email,
        id,
        name,
        avatarUrl: userBack['avatar_url'],
        isPro: userBack['is_pro'],
    };
};

export const adaptHotelToFront = (hotelBack: IHotelBack): IHotelFront => {
    const {
        bedrooms,
        images,
        description,
        goods,
        id,
        host,
        location,
        price,
        rating,
        title,
        type,
        city,
    } = hotelBack;

    return {
        bedrooms,
        city,
        description,
        goods,
        host: {
            avatarUrl: host['avatar_url'],
            id: host.id,
            isPro: host['is_pro'],
            name: host.name,
        },
        id,
        images,
        isFavorite: hotelBack['is_favorite'],
        isPremium: hotelBack['is_premium'],
        location,
        maxAdults: hotelBack['max_adults'],
        previewImage: hotelBack['preview_image'],
        price,
        rating,
        title,
        type,
    };
};

export const adaptHotelsListToFront = (hotelsListBack: IHotelBack[]): IHotelFront[] => {
    return hotelsListBack.map((hotel) => adaptHotelToFront(hotel));
};

export const adaptCommentToFront = (commentBack: ICommentGetBack): ICommentGetFront => {
    const { comment, id, rating, date, user } = commentBack;
    return {
        id,
        comment,
        rating,
        date,
        user: {
            id: user.id,
            isPro: user['is_pro'],
            avatarUrl: user['avatar_url'],
            name: user.name,
        },
    };
};

export const adaptCommentsToFront = (commentsBack: ICommentGetBack[]): ICommentGetFront[] =>
    commentsBack.map((comment) => adaptCommentToFront(comment));
