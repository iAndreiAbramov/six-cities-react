import {
    MOCK_HOTEL_FIRST_FRONT,
    MOCK_HOTEL_SECOND_FRONT,
    MOCK_HOTEL_THIRD_FRONT,
} from 'test-mocks/hotel-mocks';
import { SortOptionQuery } from 'types/sort-options.types';

import { useHotelsSort } from './useHotelsSort';

describe('useHotelsSort', () => {
    it('should sort data correctly', () => {
        const sortedByPriceAscend = useHotelsSort({
            hotels: [MOCK_HOTEL_THIRD_FRONT, MOCK_HOTEL_SECOND_FRONT, MOCK_HOTEL_FIRST_FRONT],
            sortOption: SortOptionQuery.PriceAscend,
        });

        const sortedByPriceDescend = useHotelsSort({
            hotels: [MOCK_HOTEL_FIRST_FRONT, MOCK_HOTEL_THIRD_FRONT, MOCK_HOTEL_SECOND_FRONT],
            sortOption: SortOptionQuery.PriceDescend,
        });

        const sortedByRating = useHotelsSort({
            hotels: [MOCK_HOTEL_FIRST_FRONT, MOCK_HOTEL_THIRD_FRONT, MOCK_HOTEL_SECOND_FRONT],
            sortOption: SortOptionQuery.RatingDescend,
        });

        const sortedByDefault = useHotelsSort({
            hotels: [MOCK_HOTEL_FIRST_FRONT, MOCK_HOTEL_SECOND_FRONT, MOCK_HOTEL_THIRD_FRONT],
            sortOption: SortOptionQuery.Popular,
        });

        expect(sortedByPriceAscend).toEqual([
            MOCK_HOTEL_FIRST_FRONT,
            MOCK_HOTEL_SECOND_FRONT,
            MOCK_HOTEL_THIRD_FRONT,
        ]);

        expect(sortedByPriceDescend).toEqual([
            MOCK_HOTEL_THIRD_FRONT,
            MOCK_HOTEL_SECOND_FRONT,
            MOCK_HOTEL_FIRST_FRONT,
        ]);

        expect(sortedByRating).toEqual([
            MOCK_HOTEL_THIRD_FRONT,
            MOCK_HOTEL_SECOND_FRONT,
            MOCK_HOTEL_FIRST_FRONT,
        ]);

        expect(sortedByDefault).toEqual([
            MOCK_HOTEL_FIRST_FRONT,
            MOCK_HOTEL_SECOND_FRONT,
            MOCK_HOTEL_THIRD_FRONT,
        ]);
    });
});
