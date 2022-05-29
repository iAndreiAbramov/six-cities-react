import { IHotelFront } from 'types/hotel.types';
import { SortOptionQuery } from 'types/sort-options.types';

export const useHotelsSort = ({
    hotels,
    sortOption,
}: {
    hotels: IHotelFront[];
    sortOption: string | null;
}): IHotelFront[] => {
    if (!hotels || hotels.length === 0) {
        return [];
    }

    switch (sortOption) {
        case SortOptionQuery.Popular:
            return hotels;
        case SortOptionQuery.PriceAscend:
            return hotels.sort((a, b) => {
                return a.price - b.price;
            });
        case SortOptionQuery.PriceDescend:
            return hotels.sort((a, b) => {
                return b.price - a.price;
            });
        case SortOptionQuery.RatingDescend:
            return hotels.sort((a, b) => {
                return b.rating - a.rating;
            });
        default:
            return hotels;
    }
};
