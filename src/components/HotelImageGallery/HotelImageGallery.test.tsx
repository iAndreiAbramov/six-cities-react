import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { mockRootStoreUnauthorized } from 'test-mocks/mock-stores';

import { HotelImageGallery } from './HotelImageGallery';

describe('HotelImageGallery', () => {
    it('should render passed data correctly', () => {
        const images = ['image1', 'image2', 'image3', 'image4', 'image5', 'image6'];

        render(
            <Provider store={mockRootStoreUnauthorized}>
                <BrowserRouter>
                    <HotelImageGallery images={images} />
                </BrowserRouter>
            </Provider>,
        );

        expect(screen.queryAllByRole('img')).toHaveLength(images.length);
    });
});
