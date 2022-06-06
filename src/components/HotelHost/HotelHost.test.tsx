import React from 'react';
import { render, screen } from '@testing-library/react';

import { HotelHost } from './HotelHost';

describe('HotelHost.tsx', () => {
    const hostPro = {
        avatarUrl: 'avatarUrl',
        id: 1,
        isPro: true,
        name: 'name',
    };

    it('should render passed data correctly', () => {
        render(<HotelHost host={hostPro} description="description" />);

        expect(screen.getByText('name')).toBeInTheDocument();
        expect(screen.getByText('Pro')).toBeInTheDocument();
        expect(screen.getByAltText('Host avatar')).toBeInTheDocument();
        expect(screen.getByRole('img')).toHaveAttribute('src', 'avatarUrl');
    });
});
