import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { api } from 'api/api';
import MockAdapter from 'axios-mock-adapter';
import { ApiRoute } from 'constants/ApiRoute';
import { AppRoute } from 'constants/AppRoute';
import { mockRootStoreAuthorized, mockRootStoreUnauthorized } from 'test-mocks/mock-stores';

import { UserBlock } from './UserBlock';

describe('UserBlock', () => {
    beforeEach(() => window.history.pushState(null, '', AppRoute.Home()));

    it('should render correctly when unauthorized', () => {
        render(
            <Provider store={mockRootStoreUnauthorized}>
                <BrowserRouter window={window}>
                    <UserBlock />
                </BrowserRouter>
            </Provider>,
        );

        expect(screen.getByRole('link', { name: /sign in/i })).toBeInTheDocument();
        expect(screen.queryByRole('link', { name: /sign out/i })).not.toBeInTheDocument();
        expect(screen.queryByText(/email/i)).not.toBeInTheDocument();
    });

    it('should render correctly when authorized', () => {
        render(
            <Provider store={mockRootStoreAuthorized}>
                <BrowserRouter window={window}>
                    <UserBlock />
                </BrowserRouter>
            </Provider>,
        );

        expect(screen.getByText(/sign out/i)).toBeInTheDocument();
        expect(screen.queryByRole('link', { name: /sign in/i })).not.toBeInTheDocument();
        expect(screen.getByText(/email/i)).toBeInTheDocument();
    });

    it('it should redirect to favorites page on email click', () => {
        render(
            <Provider store={mockRootStoreAuthorized}>
                <BrowserRouter window={window}>
                    <Routes>
                        <Route path={AppRoute.Home()} element={<UserBlock />} />
                        <Route path={AppRoute.Favorites()} element={<h1>Favorites page</h1>} />
                    </Routes>
                </BrowserRouter>
            </Provider>,
        );

        const favoritesLink = screen.getByText(/email/i);
        userEvent.click(favoritesLink);
        expect(screen.getByText('Favorites page')).toBeInTheDocument();
    });

    it('it should reset user data on logout', () => {
        const mockApi = new MockAdapter(api);
        mockApi.onDelete(ApiRoute.Logout()).reply(201);

        render(
            <Provider store={mockRootStoreAuthorized}>
                <BrowserRouter window={window} basename={AppRoute.Home()}>
                    <Routes>
                        <Route path={AppRoute.Home()} element={<UserBlock />} />
                        <Route path={AppRoute.Favorites()} element={<h1>Favorites page</h1>} />
                    </Routes>
                </BrowserRouter>
            </Provider>,
        );
        expect(mockRootStoreAuthorized.getState().user?.data?.email === 'email');
        const logoutLink = screen.getByText(/sign out/i);
        userEvent.click(logoutLink);
        expect(mockRootStoreAuthorized.getState().user?.data?.email === undefined);
    });
});
