import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { mockRootStoreUnauthorized } from 'test-mocks/mock-stores';

import { FavoritesListCard } from './FavoritesListCard';

describe('FavoritesListCard', () => {
    it('should render passed data correctly', () => {
        render(
            <Provider store={mockRootStoreUnauthorized}>
                <BrowserRouter>
                    <FavoritesListCard
                        id={1}
                        isPremium
                        rating={5}
                        type="room"
                        title="Cool Place"
                        price={100}
                        previewImage="image/preview"
                        isFavorite
                    />
                </BrowserRouter>
            </Provider>,
        );

        expect(screen.getByText(/room/i)).toBeInTheDocument();
        expect(screen.getByText(/Cool Place/i)).toBeInTheDocument();
        expect(screen.getByText(/100/i)).toBeInTheDocument();
        expect(screen.getByRole('img')).toHaveAttribute('alt', 'Place image');
        expect(screen.getByTestId('favorites-card')).toHaveStyle({ width: '100%' });
    });

    it('should render another passed data correctly', () => {
        render(
            <Provider store={mockRootStoreUnauthorized}>
                <BrowserRouter>
                    <FavoritesListCard
                        id={1}
                        isPremium={false}
                        rating={1}
                        type="hole in the rock"
                        title="amazing"
                        price={25}
                        previewImage="image/preview"
                        isFavorite
                    />
                </BrowserRouter>
            </Provider>,
        );

        expect(screen.getByText(/hole in the rock/i)).toBeInTheDocument();
        expect(screen.getByText(/amazing/i)).toBeInTheDocument();
        expect(screen.getByText(/25/i)).toBeInTheDocument();
        expect(screen.getByRole('img')).toHaveAttribute('alt', 'Place image');
        expect(screen.getByTestId('favorites-card')).toHaveStyle({ width: '20%' });
    });
});
