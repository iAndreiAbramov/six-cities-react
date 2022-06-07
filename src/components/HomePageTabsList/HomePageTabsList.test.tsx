import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { cities } from 'constants/Cities';

import { HomePageTabsList } from './HomePageTabsList';

describe('HomePageTabsList', () => {
    it('should render passed data correctly', () => {
        render(
            <BrowserRouter>
                <HomePageTabsList />
            </BrowserRouter>,
        );

        cities.forEach((name) => {
            expect(screen.getByText(name)).toBeInTheDocument();
        });
    });
});
