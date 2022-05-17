import { AppRoute } from 'constants/AppRoute';

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from 'pages/HomePage';

export const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={AppRoute.Home()} element={<HomePage />} />
            </Routes>
        </BrowserRouter>
    );
};