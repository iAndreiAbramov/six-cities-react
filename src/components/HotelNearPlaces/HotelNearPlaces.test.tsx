import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { NEAR_PLACES_MAX_LENGTH } from 'constants/common';
import { MOCK_HOTELS_FRONT } from 'test-mocks/hotel-mocks';
import { mockRootStoreUnauthorized } from 'test-mocks/mock-stores';

import { HotelNearPlaces } from './HotelNearPlaces';

describe('HotelNearPlaces', () => {
    it('should render passed data correctly', () => {
        render(
            <Provider store={mockRootStoreUnauthorized}>
                <BrowserRouter>
                    <HotelNearPlaces
                        nearPlaces={[...MOCK_HOTELS_FRONT, ...MOCK_HOTELS_FRONT]}
                        handleActiveHotelIdChange={() => null}
                    />
                </BrowserRouter>
            </Provider>,
        );

        expect(screen.getAllByTestId('list-card').length).toBeLessThanOrEqual(
            NEAR_PLACES_MAX_LENGTH,
        );
    });
});
