import { SortOption, SortOptionQuery } from 'types/sort-options.types';

export const useSortDisplayName = (value: string | null): SortOption | null => {
    switch (value) {
        case SortOptionQuery.Popular:
            return SortOption.Popular;
        case SortOptionQuery.PriceAscend:
            return SortOption.PriceAscend;
        case SortOptionQuery.PriceDescend:
            return SortOption.PriceDescend;
        case SortOptionQuery.RatingDescend:
            return SortOption.RatingDescend;
        default:
            return null;
    }
};
