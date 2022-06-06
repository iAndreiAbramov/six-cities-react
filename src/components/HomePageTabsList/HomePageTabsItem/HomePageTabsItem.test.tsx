import React from 'react';
import { render, screen } from '@testing-library/react';
import { CityName } from 'constants/Cities';

import { HomePageTabsItem } from './HomePageTabsItem';

describe('HomePageTabsItem', () => {
    it('should correctly render passed data', () => {
        render(<HomePageTabsItem name={CityName.Paris} handleClick={() => null} />);

        expect(screen.getByText(CityName.Paris)).toBeInTheDocument();
        expect(screen.getByTestId('tab-item')).not.toHaveClass('tabs__item--active');
    });

    it('should correctly render active state', () => {
        render(<HomePageTabsItem name={CityName.Paris} handleClick={() => null} isActive />);

        expect(screen.getByTestId('tab-item')).toHaveClass('tabs__item--active');
    });
});
