import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { COMMENTS_FRONT_MOCK } from 'test-mocks/comments-mock';
import { mockStoreRoot } from 'test-mocks/mock-stores';

import { HotelReviews } from './HotelReviews';

describe('HotelReviews', () => {
    const storeWithReviews = mockStoreRoot({
        user: {
            data: {
                email: 'fake@fake.com',
            },
        },
        hotel: {
            commentsData: COMMENTS_FRONT_MOCK,
        },
    });

    it('should render passed data correctly', () => {
        render(
            <Provider store={storeWithReviews}>
                <BrowserRouter>
                    <HotelReviews id="1" />
                </BrowserRouter>
            </Provider>,
        );

        const reviews = screen.getAllByTestId('review');
        expect(reviews).toHaveLength(3);
    });
});
