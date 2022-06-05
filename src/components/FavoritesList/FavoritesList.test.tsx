import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import {
    MOCK_HOTEL_FIRST_FRONT,
    MOCK_HOTEL_SECOND_FRONT,
    MOCK_HOTEL_THIRD_FRONT,
} from 'test-mocks/hotel-mocks';
import { mockRootStoreAuthorized } from 'test-mocks/mock-stores';

import { FavoritesList } from './FavoritesList';

describe('FavoritesList', () => {
    const mockFavoritesData = {
        Amsterdam: [MOCK_HOTEL_FIRST_FRONT],
        Cologne: [MOCK_HOTEL_SECOND_FRONT],
        Paris: [MOCK_HOTEL_THIRD_FRONT],
    };

    it('should render passed data correctly', () => {
        render(
            <Provider store={mockRootStoreAuthorized}>
                <BrowserRouter>
                    <FavoritesList favorites={mockFavoritesData} />
                </BrowserRouter>
            </Provider>,
        );

        expect(screen.getAllByTestId('favorites-city')).toHaveLength(
            Object.keys(mockFavoritesData).length,
        );

        Object.keys(mockFavoritesData).forEach((city) => {
            expect(screen.getByText(city)).toBeInTheDocument();
        });
    });
});
