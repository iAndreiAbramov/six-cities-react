import { cities, CityName } from 'constants/Cities';

import { getRandomInteger } from 'utils/common';

export const useRandomCity = (): CityName => cities[getRandomInteger(0, cities.length)];
