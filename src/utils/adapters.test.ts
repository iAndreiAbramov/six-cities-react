import {
    COMMENT_BACK_MOCK,
    COMMENT_FRONT_MOCK,
    COMMENTS_BACK_MOCK,
    COMMENTS_FRONT_MOCK,
} from 'test-mocks/comments-mock';
import {
    MOCK_HOTEL_FIRST_BACK,
    MOCK_HOTEL_FIRST_FRONT,
    MOCK_HOTELS_BACK,
    MOCK_HOTELS_FRONT,
} from 'test-mocks/hotel-mocks';
import { MOCK_USER_BACK, MOCK_USER_FRONT } from 'test-mocks/user-mocks';

import {
    adaptCommentsToFront,
    adaptCommentToFront,
    adaptHotelsListToFront,
    adaptHotelToFront,
    adaptUserToFront,
} from './adapters';

describe('adapters', () => {
    it('adaptUserToFront should return correct data', () => {
        expect(adaptUserToFront(MOCK_USER_BACK)).toEqual(MOCK_USER_FRONT);
    });

    it('adaptHotelToFront should return correct data', () => {
        expect(adaptHotelToFront(MOCK_HOTEL_FIRST_BACK)).toEqual(MOCK_HOTEL_FIRST_FRONT);
    });

    it('adaptHotelsListToFront should return correct data', () => {
        expect(adaptHotelsListToFront(MOCK_HOTELS_BACK)).toEqual(MOCK_HOTELS_FRONT);
    });

    it('adaptCommentToFront should return correct data', () => {
        expect(adaptCommentToFront(COMMENT_BACK_MOCK)).toEqual(COMMENT_FRONT_MOCK);
    });

    it('adaptCommentsToFront should return correct data', () => {
        expect(adaptCommentsToFront(COMMENTS_BACK_MOCK)).toEqual(COMMENTS_FRONT_MOCK);
    });
});
