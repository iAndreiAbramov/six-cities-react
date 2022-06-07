import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { CityName } from 'constants/Cities';
import { mockRootStoreUnauthorized } from 'test-mocks/mock-stores';

import { HomePageNoContent } from './HomePageNoContent';

describe('HomePageNoContent', () => {
    it('should render passed data correctly', () => {
        render(
            <Provider store={mockRootStoreUnauthorized}>
                <BrowserRouter>
                    <HomePageNoContent activeCity={CityName.Paris} />
                </BrowserRouter>
            </Provider>,
        );

        expect(
            screen.getByText(
                `We could not find any property available at the moment in ${CityName.Paris}`,
            ),
        ).toBeInTheDocument();
    });
});
