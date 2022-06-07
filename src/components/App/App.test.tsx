import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AppRoute } from 'constants/AppRoute';
import { NotFoundPage } from 'pages/NotFound';
import { mockRootStoreAuthorized, mockRootStoreUnauthorized } from 'test-mocks/mock-stores';

import { PrivateRoute } from 'components/PrivateRoute';
import { PublicRoute } from 'components/PublicRoute';

describe('Router', () => {
    const unAuthApp = (
        <Provider store={mockRootStoreUnauthorized}>
            <BrowserRouter window={window}>
                <Routes>
                    <Route path={AppRoute.Home()} element={<h1>Home page</h1>} />
                    <Route path={AppRoute.Hotel(':id')} element={<h1>Hotel page</h1>} />
                    <Route
                        path={AppRoute.Favorites()}
                        element={
                            <PrivateRoute>
                                <h1>Favorites page</h1>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path={AppRoute.Login()}
                        element={
                            <PublicRoute>
                                <h1>Login page</h1>
                            </PublicRoute>
                        }
                    />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
                <Link to={AppRoute.Home()}>Home</Link>
                <Link to={AppRoute.Favorites()}>Favorites</Link>
                <Link to={AppRoute.Hotel('1')}>Hotel</Link>
                <Link to={AppRoute.Login()}>Login</Link>
                <Link to="/fake/fake">Not found</Link>
            </BrowserRouter>
        </Provider>
    );

    const authApp = (
        <Provider store={mockRootStoreAuthorized}>
            <BrowserRouter window={window}>
                <Routes>
                    <Route path={AppRoute.Home()} element={<h1>Home page</h1>} />
                    <Route path={AppRoute.Hotel(':id')} element={<h1>Hotel page</h1>} />
                    <Route
                        path={AppRoute.Favorites()}
                        element={
                            <PrivateRoute>
                                <h1>Favorites page</h1>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path={AppRoute.Login()}
                        element={
                            <PublicRoute>
                                <h1>Login page</h1>
                            </PublicRoute>
                        }
                    />
                </Routes>
                <Link to={AppRoute.Home()}>Home</Link>
                <Link to={AppRoute.Favorites()}>Favorites</Link>
                <Link to={AppRoute.Hotel('1')}>Hotel</Link>
                <Link to={AppRoute.Login()}>Login</Link>
            </BrowserRouter>
        </Provider>
    );

    beforeEach(() => window.history.pushState(null, '', AppRoute.Home()));

    it('should redirect to login page from private route while unauthorized', () => {
        render(unAuthApp);

        const favoritesLink = screen.getByRole('link', { name: 'Favorites' });
        userEvent.click(favoritesLink);
        expect(screen.queryByText('Favorites page')).not.toBeInTheDocument();
        expect(screen.getByText('Login page')).toBeInTheDocument();
    });

    it('should allow public routes while unauthorized', () => {
        render(unAuthApp);

        const hotelLink = screen.getByRole('link', { name: 'Hotel' });
        userEvent.click(hotelLink);
        expect(screen.getByText('Hotel page')).toBeInTheDocument();

        const homeLink = screen.getByRole('link', { name: 'Home' });
        userEvent.click(homeLink);
        expect(screen.getByText('Home page')).toBeInTheDocument();

        const loginLink = screen.getByRole('link', { name: 'Login' });
        userEvent.click(loginLink);
        expect(screen.getByText('Login page')).toBeInTheDocument();
    });

    it('should redirect to 404 page from incorrect route', () => {
        render(unAuthApp);

        const notFoundLink = screen.getByRole('link', { name: 'Not found' });
        userEvent.click(notFoundLink);

        expect(screen.getByText('Error 404: page not found')).toBeInTheDocument();
    });

    it('should allow favorites page while authorized', () => {
        render(authApp);

        const favoritesLink = screen.getByRole('link', { name: 'Favorites' });
        userEvent.click(favoritesLink);
        expect(screen.getByText('Favorites page')).toBeInTheDocument();
    });

    it('should redirect from login page to main page while authorized', () => {
        render(authApp);

        const loginLink = screen.getByRole('link', { name: 'Login' });
        userEvent.click(loginLink);

        expect(screen.getByText('Home page')).toBeInTheDocument();
    });
});
