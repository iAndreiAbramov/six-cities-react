export enum SortOption {
    Popular = 'Popular',
    PriceAscend = 'Price: low to high',
    PriceDescend = 'Price: high to low',
    RatingDescend = 'Top rated first',
}

export enum SortOptionQuery {
    Popular = 'Popular',
    PriceAscend = 'Price-Ascend',
    PriceDescend = 'Price-Descend',
    RatingDescend = 'Rating-Descend',
}

export interface ISortOption {
    displayName: SortOption;
    queryName: SortOptionQuery;
}
