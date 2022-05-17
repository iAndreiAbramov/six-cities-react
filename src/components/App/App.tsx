import { AppRoute } from 'constants/AppRoute';

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { FavoritesPage } from 'pages/FavoritesPage';
import { HomePage } from 'pages/HomePage';
import { HotelPage } from 'pages/HotelPage';
import { LoginPage } from 'pages/LoginPage';
import { NotFoundPage } from 'pages/NotFound';

import { PrivateRoute } from 'components/PrivateRoute';

export const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={AppRoute.Home()} element={<HomePage />} />
                <Route path={AppRoute.Hotel(':id')} element={<HotelPage />} />
                <Route path={AppRoute.Login()} element={<LoginPage />} />
                <Route
                    path={AppRoute.Favorites()}
                    element={
                        <PrivateRoute>
                            <FavoritesPage />
                        </PrivateRoute>
                    }
                />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
};
