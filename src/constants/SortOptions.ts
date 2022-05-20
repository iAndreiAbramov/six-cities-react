export enum SortOption {
    Popular = 'Popular',
    PriceAscend = 'Price: low to high',
    PriceDescend = 'Price: high to low',
    RatingDescend = 'Top rated first',
}

export const sortOptions = [
    SortOption.Popular,
    SortOption.PriceAscend,
    SortOption.PriceDescend,
    SortOption.RatingDescend,
];
