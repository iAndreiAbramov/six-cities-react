import { useSelector } from 'react-redux';
import { selectHotels } from 'store/selectors/hotels-selectors';
import { IHotelFront } from 'types/hotel.types';

export const useHotels = (activeCity: string | null): IHotelFront[] => {
    const hotels = useSelector(selectHotels);

    if (!activeCity) {
        return [];
    }

    return hotels.filter((hotel) => hotel.city.name.toLowerCase() === activeCity.toLowerCase());
};
