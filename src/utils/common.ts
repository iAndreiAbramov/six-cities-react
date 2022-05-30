import { MAX_REVIEWS_NUMBER, months } from 'constants/common';
import { ICommentGetFront, RatingType } from 'types/comment.types';

export const getDateForComment = (date: string): string => {
    const parsedDate = new Date(date);

    const year = parsedDate.getFullYear();
    const monthNumber = parsedDate.getMonth();

    return `${months[monthNumber]} ${year}`;
};

export const getDateTimeForComment = (date: string): string => {
    const parsedDate = new Date(date);
    const year = parsedDate.getFullYear();
    const monthNumber = parsedDate.getMonth() + 1;
    const day = parsedDate.getDate();

    return `${year}-${monthNumber}-${day}`;
};

export const getPreparedComments = (comments: ICommentGetFront[]): ICommentGetFront[] => {
    if (comments.length < 2) {
        return comments;
    }

    return [...comments]
        .sort((a, b) => {
            return Date.parse(a.date) - Date.parse(b.date);
        })
        .slice(0, MAX_REVIEWS_NUMBER);
};

export const getRatingTitle = (value: RatingType): string => {
    switch (value) {
        case 5:
            return 'perfect';
        case 4:
            return 'good';
        case 3:
            return 'not so bad';
        case 2:
            return 'badly';
        case 1:
            return 'terribly';
    }
};
