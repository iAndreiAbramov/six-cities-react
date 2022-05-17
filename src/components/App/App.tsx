import { AppRoute } from 'constants/AppRoute';

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from 'pages/HomePage';
import { HotelPage } from 'pages/HotelPage';
import { LoginPage } from 'pages/LoginPage';

export const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={AppRoute.Home()} element={<HomePage />} />
                <Route path={AppRoute.Hotel('1')} element={<HotelPage />} />
                <Route path={AppRoute.Login()} element={<LoginPage />} />
            </Routes>
        </BrowserRouter>
    );
};
