import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { mockRootStoreAuthorized } from 'test-mocks/mock-stores';

import { PageHeader } from './PageHeader';

describe('PageHeader', () => {
    it('it should render logo correctly', () => {
        render(
            <BrowserRouter>
                <PageHeader />
            </BrowserRouter>,
        );

        expect(screen.getByAltText(/6 cities logo/i)).toBeInTheDocument();
    });

    it('it should not render UserBlock without a prop', () => {
        render(
            <Provider store={mockRootStoreAuthorized}>
                <BrowserRouter>
                    <PageHeader />
                </BrowserRouter>
            </Provider>,
        );

        expect(screen.queryByRole('link', { name: /sign in/i })).not.toBeInTheDocument();
        expect(screen.queryByRole('link', { name: /sign out/i })).not.toBeInTheDocument();
        expect(screen.queryByText(/email/i)).not.toBeInTheDocument();
    });

    it('it should render UserBlock with a prop', () => {
        render(
            <Provider store={mockRootStoreAuthorized}>
                <BrowserRouter>
                    <PageHeader isWithUser />
                </BrowserRouter>
            </Provider>,
        );

        expect(screen.getByText(/sign out/i)).toBeInTheDocument();
        expect(screen.queryByRole('link', { name: /sign in/i })).not.toBeInTheDocument();
        expect(screen.getByText(/email/i)).toBeInTheDocument();
    });
});
