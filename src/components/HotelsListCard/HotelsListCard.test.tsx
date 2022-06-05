import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { mockRootStoreUnauthorized } from 'test-mocks/mock-stores';

import { HotelsListCard } from './HotelsListCard';

describe('HotelsListCard', () => {
    it('component should render passed data correctly', () => {
        render(
            <Provider store={mockRootStoreUnauthorized}>
                <BrowserRouter>
                    <HotelsListCard
                        id={1}
                        isPremium
                        rating={5}
                        type="hotel"
                        title="Nice Place"
                        price={200}
                        previewImage="image/url"
                        handleActiveHotelIdChange={() => null}
                        isFavorite
                    />
                </BrowserRouter>
            </Provider>,
        );

        expect(screen.getByText(/hotel/i)).toBeInTheDocument();
        expect(screen.getByText(/Premium/i)).toBeInTheDocument();
        expect(screen.getByText(/Nice Place/i)).toBeInTheDocument();
        expect(screen.getByText(/200/i)).toBeInTheDocument();
        expect(screen.getByAltText('Place image')).toBeInTheDocument();
        expect(screen.getByTestId('card-stars')).toHaveStyle({ width: '100%' });
    });

    it('component should render another passed data correctly', () => {
        render(
            <Provider store={mockRootStoreUnauthorized}>
                <BrowserRouter>
                    <HotelsListCard
                        id={1}
                        isPremium={false}
                        rating={3}
                        type="room"
                        title="Ugly place"
                        price={300}
                        previewImage="image/url"
                        handleActiveHotelIdChange={() => null}
                        isFavorite
                    />
                </BrowserRouter>
            </Provider>,
        );

        expect(screen.getByText(/room/i)).toBeInTheDocument();
        expect(screen.queryByText(/Premium/i)).not.toBeInTheDocument();
        expect(screen.getByText(/Ugly place/i)).toBeInTheDocument();
        expect(screen.getByText(/300/i)).toBeInTheDocument();
        expect(screen.getByAltText('Place image')).toBeInTheDocument();
        expect(screen.getByTestId('card-stars')).toHaveStyle({ width: '60%' });
    });
});
