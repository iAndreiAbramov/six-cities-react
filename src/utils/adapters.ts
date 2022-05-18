import { IUserAuthResponse, IUserFront } from 'types/user-auth.types';

export const adaptUserToFront = (userBack: IUserAuthResponse): IUserFront => {
    const { avatar_url, email, is_pro, id, name } = userBack;
    return {
        email,
        id,
        name,
        avatarUrl: avatar_url,
        isPro: is_pro,
    };
};
