import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { CityName } from 'constants/Cities';
import { MOCK_HOTELS_FRONT } from 'test-mocks/hotel-mocks';
import { mockRootStoreUnauthorized } from 'test-mocks/mock-stores';

import { HotelsList } from './HotelsList';

describe('HotelsList', () => {
    it('should render list of items correctly', () => {
        render(
            <Provider store={mockRootStoreUnauthorized}>
                <BrowserRouter>
                    <HotelsList
                        hotels={MOCK_HOTELS_FRONT}
                        activeCity={CityName.Amsterdam}
                        handleActiveHotelIdChange={() => null}
                    />
                </BrowserRouter>
            </Provider>,
        );

        expect(screen.getAllByTestId('list-card')).toHaveLength(MOCK_HOTELS_FRONT.length);
        expect(
            screen.getByText(`${MOCK_HOTELS_FRONT.length} places to stay in ${CityName.Amsterdam}`),
        );
    });
});
