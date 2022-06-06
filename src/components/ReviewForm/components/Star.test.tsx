import React from 'react';
import { Form } from 'react-final-form';
import { render, screen } from '@testing-library/react';

import { Star } from './Star';

describe('Component', () => {
    it('should render passed data correctly', () => {
        render(<Form onSubmit={jest.fn}>{() => <Star value={3} />}</Form>);

        const star = screen.getByRole('radio');
        expect(star).not.toBeChecked();
        expect(star).toHaveAttribute('value', '3');
    });
});
