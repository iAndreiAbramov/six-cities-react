import {
    getDateForComment,
    getDateTimeForComment,
    getRandomInteger,
    getRatingTitle,
} from './common';

describe('common utils', () => {
    const TEST_DATE_STRING = '2022-06-03T19:56:15.147Z';
    const MIN_INTEGER = 1;
    const MAX_INTEGER = 5;
    const RANDOM_TESTS_NUMBER = 100;

    it('getDateForComment should return correct value', () => {
        expect(getDateForComment(TEST_DATE_STRING)).toBe('June 2022');
    });
    it('getDateTimeForComment should return correct value', () => {
        expect(getDateTimeForComment(TEST_DATE_STRING)).toBe('2022-6-3');
    });
    it('getRatingTitle should return correct value', () => {
        expect(getRatingTitle(5)).toBe('perfect');
    });
    it('getRandomInteger should return correct value', () => {
        for (let i = 1; i < RANDOM_TESTS_NUMBER; i++) {
            expect(getRandomInteger(MIN_INTEGER, MAX_INTEGER)).toBeLessThanOrEqual(MAX_INTEGER);
            expect(getRandomInteger(MIN_INTEGER, MAX_INTEGER)).toBeGreaterThanOrEqual(MIN_INTEGER);
        }
    });
});
