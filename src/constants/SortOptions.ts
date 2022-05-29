import { ISortOption, SortOption, SortOptionQuery } from 'types/sort-options.types';

export const sortOptions: ISortOption[] = [
    {
        displayName: SortOption.Popular,
        queryName: SortOptionQuery.Popular,
    },
    {
        displayName: SortOption.PriceAscend,
        queryName: SortOptionQuery.PriceAscend,
    },
    {
        displayName: SortOption.PriceDescend,
        queryName: SortOptionQuery.PriceDescend,
    },
    {
        displayName: SortOption.RatingDescend,
        queryName: SortOptionQuery.RatingDescend,
    },
];
