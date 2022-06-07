import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { sortOptions } from 'constants/SortOptions';
import { SortOption, SortOptionQuery } from 'types/sort-options.types';

import { HomePageSortDropdown } from './HomePageSortDropdown';

describe('HomePageSortDropdown', () => {
    it('should render passed data correctly', () => {
        render(
            <HomePageSortDropdown
                options={sortOptions}
                currentSort={SortOptionQuery.PriceDescend}
                handleSortChange={() => null}
            />,
        );

        expect(screen.getByText(SortOption.PriceDescend)).toBeInTheDocument();
        const toggle = screen.getByTestId('dropdown-toggle');

        userEvent.click(toggle);

        expect(screen.getAllByText(SortOption.PriceDescend)).toHaveLength(2);
        expect(screen.getByText(SortOption.Popular)).toBeInTheDocument();
        expect(screen.getByText(SortOption.PriceAscend)).toBeInTheDocument();
        expect(screen.getByText(SortOption.RatingDescend)).toBeInTheDocument();
    });
});
