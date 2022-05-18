import { QueryParam } from 'constants/QueryParam';

import { useSelector } from 'react-redux';
import { selectHotels } from 'store/selectors/hotels-selectors';
import { IHotelFront } from 'types/hotel.types';

import { useQuery } from './useQuery';

export const useHotels = (): IHotelFront[] => {
    const hotels = useSelector(selectHotels);
    const query = useQuery();
    const activeCity = query.get(QueryParam.City);

    if (!activeCity) {
        return [];
    }

    return hotels.filter((hotel) => hotel.city.name.toLowerCase() === activeCity.toLowerCase());
};
